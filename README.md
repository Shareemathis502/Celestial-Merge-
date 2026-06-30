# Celestial Merge - Android Game

A merge game for Android featuring chakra types, human design archetypes, and manifestation mechanics.

## Project Structure

### `Assets/`
- **Scenes/** - Game scenes (MainScene.unity)
- **Scripts/** - C# game logic
  - `Game/` - Core game mechanics (GameManager, MergeManager, BoardSlot, etc.)
  - `UI/` - User interface components (UIManager, BreathIndicator, Leaderboard, etc.)
  - `Input/` - Input handling (DragDropHandler)
  - `Data/` - Save/load system (SaveSystem)
  - `Utils/` - Utilities (HapticFeedback, SoundManager)
- **Resources/** - Fonts, audio, strings
- **Prefabs/** - Game object prefabs (DragonPiece, ShadowBlock, GeneratorPreview, etc.)
- **UI/** - UI prefabs and canvas

### `Packages/`
- `manifest.json` - Unity package dependencies

### `ProjectSettings/`
- `ProjectVersion.txt` - Unity version
- `GraphicsSettings.asset` - Graphics configuration
- `InputManager.asset` - Input configuration

## Setup

1. **Requirements:**
   - Unity 2022.3 LTS or later
   - Android SDK & NDK (for Android builds)

2. **Open the Project:**
   ```bash
   # Open CelestialMerge in Unity Hub
   ```

3. **Switch Platform to Android:**
   - File → Build Settings
   - Select Android platform
   - Click "Switch Platform"

4. **Build for Android:**
   - File → Build Settings
   - Select scenes to include
   - Click "Build" (creates .apk) or "Build and Run" (installs to device)

## Game Architecture

### Core Managers
- **GameManager** - Overall game flow and initialization
- **MergeManager** - Merge mechanics and item combination logic
- **ArchetypeManager** - Archetype data and configurations
- **SaveSystem** - Player progress persistence

### UI System
- **UIManager** - Central UI controller
- **BreathIndicator** - Display breath/mana mechanics
- **GeneratorQueue** - Queue system for item generation
- **ManifestationHeader** - Header display
- **LeaderboardManager** - Player rankings
- **ZenSpaceManager** - Zen/meditation space UI

### Input System
- **DragDropHandler** - Drag and drop mechanics for merging items

## Development

### Creating New Scenes
1. Right-click in Assets/Scenes → Create → Scene
2. Add GameManager prefab and necessary UI Canvas

### Adding New Game Items
1. Create scriptable object in `Assets/Resources/Items`
2. Reference in MergeManager
3. Create visual prefab

### Building for Android
```bash
# Command line build (optional)
unity -batchmode -nographics -quit -buildAndroidAPK
```

## License
Private project
