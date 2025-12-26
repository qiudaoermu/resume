import { aiUnderStandVideo } from '../app/video-understanding.js';

// Mock Google Generative AI
jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => {
      return {
        getGenerativeModel: jest.fn().mockReturnValue({
          generateContentStream: jest.fn()
        })
      };
    })
  };
});

// Mock environment variables
process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_URL = 'https://www.youtube.com/embed/test-video';

describe('AI Video Understanding', () => {
  let mockModel;
  let mockGenerateContentStream;

  beforeEach(async () => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Get the mocked GoogleGenerativeAI
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const mockGenAI = new GoogleGenerativeAI();
    mockModel = mockGenAI.getGenerativeModel();
    mockGenerateContentStream = mockModel.generateContentStream;
    
    // Mock console.log and console.error to avoid noise in tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console methods
    console.log.mockRestore();
    console.error.mockRestore();
  });

  it('should analyze video successfully with streaming response', async () => {
    const mockChunks = [
      { text: () => 'This video shows ' },
      { text: () => 'a beautiful landscape ' },
      { text: () => 'with mountains and trees.' }
    ];

    // Mock the async generator
    mockGenerateContentStream.mockResolvedValue({
      stream: (async function* () {
        for (const chunk of mockChunks) {
          yield chunk;
        }
      })()
    });

    const onChunkCallback = jest.fn();
    const videoUrl = 'https://www.youtube.com/embed/test-video';
    const summary = 'Test video summary';

    const result = await aiUnderStandVideo(videoUrl, summary, onChunkCallback);

    expect(result).toBe('This video shows a beautiful landscape with mountains and trees.');
    expect(onChunkCallback).toHaveBeenCalledTimes(3);
    expect(onChunkCallback).toHaveBeenNthCalledWith(1, 'This video shows ', 'This video shows ');
    expect(onChunkCallback).toHaveBeenNthCalledWith(2, 'a beautiful landscape ', 'This video shows a beautiful landscape ');
    expect(onChunkCallback).toHaveBeenNthCalledWith(3, 'with mountains and trees.', 'This video shows a beautiful landscape with mountains and trees.');
  });

  it('should use fallback video URL when none provided', async () => {
    const mockChunks = [{ text: () => 'Analysis complete' }];

    mockGenerateContentStream.mockResolvedValue({
      stream: (async function* () {
        for (const chunk of mockChunks) {
          yield chunk;
        }
      })()
    });

    const result = await aiUnderStandVideo(null, 'Test summary');

    expect(mockGenerateContentStream).toHaveBeenCalledWith([
      expect.stringContaining('Test summary'),
      {
        fileData: {
          fileUri: process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_URL
        }
      }
    ]);
    expect(result).toBe('Analysis complete');
  });

  it('should handle API errors gracefully', async () => {
    const errorMessage = 'API quota exceeded';
    mockGenerateContentStream.mockRejectedValue(new Error(errorMessage));

    const result = await aiUnderStandVideo('test-url', 'test summary');

    expect(result).toBe('视频分析失败，请检查网络连接或稍后重试。');
    expect(console.error).toHaveBeenCalledWith('Error analyzing YouTube video:', expect.any(Error));
  });

  it('should handle empty streaming response', async () => {
    // Mock empty stream
    mockGenerateContentStream.mockResolvedValue({
      stream: (async function* () {
        // Empty generator
      })()
    });

    const result = await aiUnderStandVideo('test-url', 'test summary');

    expect(result).toBe('无法分析视频内容');
  });

  it('should call onChunk callback for each chunk', async () => {
    const mockChunks = [
      { text: () => 'Chunk 1 ' },
      { text: () => 'Chunk 2 ' },
      { text: () => 'Chunk 3' }
    ];

    mockGenerateContentStream.mockResolvedValue({
      stream: (async function* () {
        for (const chunk of mockChunks) {
          yield chunk;
        }
      })()
    });

    const onChunkCallback = jest.fn();
    await aiUnderStandVideo('test-url', 'test summary', onChunkCallback);

    expect(onChunkCallback).toHaveBeenCalledTimes(3);
    expect(onChunkCallback).toHaveBeenNthCalledWith(1, 'Chunk 1 ', 'Chunk 1 ');
    expect(onChunkCallback).toHaveBeenNthCalledWith(2, 'Chunk 2 ', 'Chunk 1 Chunk 2 ');
    expect(onChunkCallback).toHaveBeenNthCalledWith(3, 'Chunk 3', 'Chunk 1 Chunk 2 Chunk 3');
  });

  it('should work without onChunk callback', async () => {
    const mockChunks = [{ text: () => 'Test response' }];

    mockGenerateContentStream.mockResolvedValue({
      stream: (async function* () {
        for (const chunk of mockChunks) {
          yield chunk;
        }
      })()
    });

    // Should not throw error when onChunk is not provided
    const result = await aiUnderStandVideo('test-url', 'test summary');
    expect(result).toBe('Test response');
  });

  it('should handle invalid onChunk callback', async () => {
    const mockChunks = [{ text: () => 'Test response' }];

    mockGenerateContentStream.mockResolvedValue({
      stream: (async function* () {
        for (const chunk of mockChunks) {
          yield chunk;
        }
      })()
    });

    // Should not throw error when onChunk is not a function
    const result = await aiUnderStandVideo('test-url', 'test summary', 'not-a-function');
    expect(result).toBe('Test response');
  });

  it('should include correct prompt in API call', async () => {
    const mockChunks = [{ text: () => 'Response' }];

    mockGenerateContentStream.mockResolvedValue({
      stream: (async function* () {
        for (const chunk of mockChunks) {
          yield chunk;
        }
      })()
    });

    const summary = 'My video summary about nature';
    await aiUnderStandVideo('test-url', summary);

    expect(mockGenerateContentStream).toHaveBeenCalledWith([
      expect.stringContaining('My video summary about nature'),
      expect.objectContaining({
        fileData: {
          fileUri: 'test-url'
        }
      })
    ]);

    // Check that the prompt includes the expected instructions
    const calledWith = mockGenerateContentStream.mock.calls[0][0];
    const promptText = calledWith[0];
    expect(promptText).toContain('Check and point out grammatical errors');
    expect(promptText).toContain('Please summarize this video in 10-20 sentences');
    expect(promptText).toContain('Give me a score with a ten-point system');
  });

  it('should log analysis progress', async () => {
    const mockChunks = [{ text: () => 'Progress update' }];

    mockGenerateContentStream.mockResolvedValue({
      stream: (async function* () {
        for (const chunk of mockChunks) {
          yield chunk;
        }
      })()
    });

    await aiUnderStandVideo('test-url', 'test summary');

    expect(console.log).toHaveBeenCalledWith('Analyzing YouTube video:', 'test-url');
    expect(console.log).toHaveBeenCalledWith('----Progress update----');
  });
});