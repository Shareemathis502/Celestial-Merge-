using UnityEngine;
using UnityEngine.EventSystems;

public class DragDropHandler : MonoBehaviour, IDragHandler, IEndDragHandler, IBeginDragHandler
{
    private MergeItem draggedItem;
    private BoardSlot originalSlot;

    public void OnBeginDrag(PointerEventData eventData)
    {
        draggedItem = GetComponentInParent<MergeItem>();
        if (draggedItem != null)
        {
            originalSlot = draggedItem.GetComponentInParent<BoardSlot>();
        }
    }

    public void OnDrag(PointerEventData eventData)
    {
        if (draggedItem != null)
        {
            draggedItem.transform.position = eventData.position;
        }
    }

    public void OnEndDrag(PointerEventData eventData)
    {
        // TODO: Implement drop logic
        if (draggedItem != null && originalSlot != null)
        {
            draggedItem.transform.SetParent(originalSlot.transform);
            draggedItem.transform.localPosition = Vector3.zero;
        }
    }
}
