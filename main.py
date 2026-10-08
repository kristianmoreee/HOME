"""Seedance 2.5 text-to-video example using the official Higgsfield SDK.

Reads HF_KEY (key-id:key-secret) from .env.local at runtime.
"""
import sys

from dotenv import load_dotenv

load_dotenv(".env.local")

import higgsfield_client  # noqa: E402  (reads HF_KEY from the environment)

MODEL = "bytedance/seedance-2.5/text-to-video"
ARGUMENTS = {
    "prompt": "A cinematic scene at sunset",
    "duration": 5,
    "resolution": "720p",
    "aspect_ratio": "16:9",
}


def find_video_url(result):
    video = result.get("video")
    if isinstance(video, dict) and video.get("url"):
        return video["url"]
    for item in result.get("videos") or []:
        if isinstance(item, dict) and item.get("url"):
            return item["url"]
    return None


def main() -> int:
    try:
        result = higgsfield_client.subscribe(
            MODEL,
            arguments=ARGUMENTS,
            on_enqueue=lambda request_id: print(f"Queued request {request_id}"),
            on_queue_update=lambda status: print(f"Status: {type(status).__name__}"),
        )
    except Exception as exc:  # network, auth or validation errors
        print(f"Generation request failed: {exc}", file=sys.stderr)
        return 1

    status = str(result.get("status", "")).lower()
    if status and status != "completed":
        print(f"Generation did not complete (status: {status}).", file=sys.stderr)
        return 1

    url = find_video_url(result)
    if not url:
        print(f"No video URL in response: {result}", file=sys.stderr)
        return 1

    print(f"Video URL: {url}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
