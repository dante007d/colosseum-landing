import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add audio ref
content = content.replace(
    'const bgRef = useRef<HTMLDivElement>(null);',
    'const bgRef = useRef<HTMLDivElement>(null);\n  const audioRef = useRef<HTMLAudioElement>(null);'
)

# 2. Start audio when intro starts (if browser allows)
# We can't guarantee autoplay with sound, so we'll add an "Enter the Arena" button if needed, 
# but for now I'll just add the tag and attempt autoplay.

content = content.replace(
    '<video',
    '<audio ref={audioRef} src="/intro-audio.mp3" autoPlay />\n        <video'
)

# 3. Pause audio when intro is complete
content = content.replace(
    'setShowIntro(false);',
    'if (audioRef.current) {\n        audioRef.current.pause();\n      }\n      setShowIntro(false);'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
