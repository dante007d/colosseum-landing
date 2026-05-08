import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix ReferenceError: remove clearTimeout(timer)
content = content.replace('clearTimeout(timer);', '')

# 2. Refine Interaction: unmute video on interaction
content = content.replace(
    'if (videoRef.current) videoRef.current.play().catch(e => console.log("Video play blocked", e));',
    'if (videoRef.current) {\n                videoRef.current.muted = false;\n                videoRef.current.play().catch(e => console.log("Video play blocked", e));\n              }'
)

# 3. Ensure Video is muted initially (for safer autoplay)
content = content.replace('<video ref={videoRef}', '<video ref={videoRef} muted')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
