using UnityEngine;
using System.IO;

public class SaveSystem : MonoBehaviour
{
    private string savePath;

    private void Awake()
    {
        savePath = Path.Combine(Application.persistentDataPath, "save.dat");
    }

    public void SaveGame()
    {
        // TODO: Implement save logic
        Debug.Log($"Game saved to {savePath}");
    }

    public void LoadGame()
    {
        if (File.Exists(savePath))
        {
            // TODO: Implement load logic
            Debug.Log($"Game loaded from {savePath}");
        }
    }
}
