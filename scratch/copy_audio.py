import shutil
import os

src = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\assets\300 OST - Returns a King (HD Stereo) [VAZsf8mTfyk].mp3'
dst = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\public\intro-audio.mp3'

if os.path.exists(src):
    shutil.copy2(src, dst)
    print("Success: File copied to " + dst)
else:
    print("Error: Source file not found at " + src)
    # List assets to see what is there
    print("Assets folder content:")
    print(os.listdir(r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\assets'))
