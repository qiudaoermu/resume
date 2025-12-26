import { renderHook, act } from '@testing-library/react';
import { useYouTubeVideos } from '../../app/hook/useFetchYouTubeVideos';

// Mock fetch
global.fetch = jest.fn();

// Mock environment variables
process.env.NEXT_PUBLIC_YOUTUBE_API_KEY = 'test-api-key';

describe('useYouTubeVideos Hook', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useYouTubeVideos());

    expect(result.current.videos).toEqual([]);
    expect(result.current.loadingVideos).toBe(false);
    expect(result.current.error).toBe('');
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalResults).toBe(0);
    expect(result.current.hasNextPage).toBe(false);
  });

  it('should handle missing API key', async () => {
    // Temporarily remove API key
    const originalApiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    delete process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

    const { result } = renderHook(() => useYouTubeVideos());

    await act(async () => {
      await result.current.fetchVideos('test query');
    });

    expect(result.current.error).toBe('YouTube API密钥未配置');
    expect(result.current.loadingVideos).toBe(false);

    // Restore API key
    process.env.NEXT_PUBLIC_YOUTUBE_API_KEY = originalApiKey;
  });

  it('should fetch videos successfully', async () => {
    const mockSearchResponse = {
      items: [
        {
          id: { videoId: 'test-video-1' },
          snippet: {
            title: 'Test Video 1',
            description: 'Test description 1'
          }
        },
        {
          id: { videoId: 'test-video-2' },
          snippet: {
            title: 'Test Video 2',
            description: 'Test description 2'
          }
        }
      ],
      pageInfo: {
        totalResults: 100
      },
      nextPageToken: 'next-token-123'
    };

    const mockDetailsResponse = {
      items: [
        {
          id: 'test-video-1',
          snippet: {
            title: 'Test Video 1',
            description: 'Test description 1',
            thumbnails: {
              medium: { url: 'https://example.com/thumb1.jpg' }
            },
            channelTitle: 'Test Channel 1',
            publishedAt: '2024-01-01T00:00:00Z'
          },
          contentDetails: {
            duration: 'PT2M30S'
          },
          statistics: {
            viewCount: '1000'
          }
        },
        {
          id: 'test-video-2',
          snippet: {
            title: 'Test Video 2',
            description: 'Test description 2',
            thumbnails: {
              default: { url: 'https://example.com/thumb2.jpg' }
            },
            channelTitle: 'Test Channel 2',
            publishedAt: '2024-01-02T00:00:00Z'
          },
          contentDetails: {
            duration: 'PT1M45S'
          },
          statistics: {
            viewCount: '2000'
          }
        }
      ]
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockSearchResponse)
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockDetailsResponse)
      });

    const { result } = renderHook(() => useYouTubeVideos());

    await act(async () => {
      await result.current.fetchVideos('test query');
    });

    expect(result.current.videos).toHaveLength(2);
    expect(result.current.videos[0]).toEqual({
      id: 'test-video-1',
      title: 'Test Video 1',
      description: 'Test description 1',
      thumbnail: 'https://example.com/thumb1.jpg',
      channelTitle: 'Test Channel 1',
      publishedAt: '2024-01-01T00:00:00Z',
      duration: 'PT2M30S',
      viewCount: '1000',
      url: 'https://www.youtube.com/watch?v=test-video-1'
    });
    expect(result.current.totalResults).toBe(100);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.loadingVideos).toBe(false);
    expect(result.current.error).toBe('');
  });

  it('should handle API errors', async () => {
    const mockErrorResponse = {
      error: {
        message: 'API quota exceeded'
      }
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockErrorResponse)
    });

    const { result } = renderHook(() => useYouTubeVideos());

    await act(async () => {
      await result.current.fetchVideos('test query');
    });

    expect(result.current.error).toBe('获取YouTube视频失败，请检查网络连接或API配置');
    expect(result.current.loadingVideos).toBe(false);
    expect(result.current.videos).toEqual([]);
  });

  it('should handle network errors', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useYouTubeVideos());

    await act(async () => {
      await result.current.fetchVideos('test query');
    });

    expect(result.current.error).toBe('获取YouTube视频失败，请检查网络连接或API配置');
    expect(result.current.loadingVideos).toBe(false);
  });

  it('should format duration correctly', () => {
    const { result } = renderHook(() => useYouTubeVideos());

    expect(result.current.formatDuration('PT2M30S')).toBe('2:30');
    expect(result.current.formatDuration('PT1H30M45S')).toBe('1:30:45');
    expect(result.current.formatDuration('PT45S')).toBe('0:45');
    expect(result.current.formatDuration('PT5M')).toBe('5:00');
    expect(result.current.formatDuration('PT1H')).toBe('1:00:00');
    expect(result.current.formatDuration('invalid')).toBe('0:00');
  });

  it('should handle pagination', async () => {
    const mockResponse = {
      items: [],
      pageInfo: { totalResults: 0 },
      nextPageToken: 'next-token'
    };

    (fetch as jest.Mock)
      .mockResolvedValue({
        json: () => Promise.resolve(mockResponse)
      });

    const { result } = renderHook(() => useYouTubeVideos());

    // Set up initial state
    await act(async () => {
      await result.current.fetchVideos('test');
    });

    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.currentPage).toBe(1);

    // Test next page
    await act(async () => {
      await result.current.goToNextPage('test');
    });

    expect(result.current.currentPage).toBe(2);

    // Test reset pagination
    act(() => {
      result.current.resetPagination();
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalResults).toBe(0);
    expect(result.current.hasNextPage).toBe(false);
  });

  it('should set loading state correctly', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    (fetch as jest.Mock).mockReturnValueOnce({
      json: () => promise
    });

    const { result } = renderHook(() => useYouTubeVideos());

    // Start fetching
    act(() => {
      result.current.fetchVideos('test');
    });

    expect(result.current.loadingVideos).toBe(true);

    // Resolve the promise
    await act(async () => {
      resolvePromise!({ items: [], pageInfo: { totalResults: 0 } });
      await promise;
    });

    expect(result.current.loadingVideos).toBe(false);
  });
});