using UnityEngine;

public class BoardSlot : MonoBehaviour
{
    private MergeItem currentItem;

    public bool IsOccupied => currentItem != null;

    public void PlaceItem(MergeItem item)
    {
        if (currentItem != null)
        {
            Debug.LogWarning("Slot already occupied!");
            return;
        }
        currentItem = item;
        item.transform.SetParent(transform);
        item.transform.localPosition = Vector3.zero;
    }

    public MergeItem RemoveItem()
    {
        MergeItem item = currentItem;
        currentItem = null;
        return item;
    }
}
