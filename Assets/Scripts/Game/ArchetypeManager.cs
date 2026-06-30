using UnityEngine;

public class ArchetypeManager : MonoBehaviour
{
    public static ArchetypeManager Instance { get; private set; }

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }
        Instance = this;
    }

    // TODO: Add archetype data management
}
