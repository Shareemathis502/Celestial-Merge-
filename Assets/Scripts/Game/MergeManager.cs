using UnityEngine;

public class MergeManager : MonoBehaviour
{
    [SerializeField] private BoardSlot[] boardSlots;

    public void AttemptMerge(MergeItem item1, MergeItem item2)
    {
        // TODO: Implement merge logic
        Debug.Log($"Attempting to merge {item1.name} with {item2.name}");
    }
}
