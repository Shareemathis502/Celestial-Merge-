using UnityEngine;

public class MergeItem : MonoBehaviour
{
    [SerializeField] private ChakraType chakraType;
    [SerializeField] private int level = 1;

    public ChakraType ChakraType => chakraType;
    public int Level => level;

    public void Merge(MergeItem other)
    {
        if (other.chakraType == this.chakraType && other.level == this.level)
        {
            level++;
            Destroy(other.gameObject);
        }
    }
}
