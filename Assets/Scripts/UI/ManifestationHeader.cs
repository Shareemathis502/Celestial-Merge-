using UnityEngine;
using UnityEngine.UI;

public class ManifestationHeader : MonoBehaviour
{
    [SerializeField] private Text headerText;

    public void UpdateHeader(string text)
    {
        headerText.text = text;
    }
}
