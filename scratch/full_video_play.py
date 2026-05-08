import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the 8-second safety timer to allow the video to play full
content = content.replace('const timer = setTimeout(() => { if (showIntro) handleIntroComplete(); }, 8000);', '// timer removed to allow full play')

# 2. Unmute the video
content = content.replace('muted', '')

# 3. Ensure the video ref is available to play it on interaction
content = content.replace(
    'const audioRef = useRef<HTMLAudioElement>(null);',
    'const audioRef = useRef<HTMLAudioElement>(null);\n  const videoRef = useRef<HTMLVideoElement>(null);'
)
content = content.replace(
    '<video',
    '<video ref={videoRef}'
)
content = content.replace(
    'if (audioRef.current) audioRef.current.play().catch(e => console.log("Audio play blocked", e));',
    'if (audioRef.current) audioRef.current.play().catch(e => console.log("Audio play blocked", e));\n              if (videoRef.current) videoRef.current.play().catch(e => console.log("Video play blocked", e));'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
