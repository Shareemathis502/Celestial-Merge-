using UnityEngine;
using UnityEngine.UI;

public class BreathIndicator : MonoBehaviour
{
    [SerializeField] private Image breathBar;
    [SerializeField] private float maxBreath = 100f;
    private float currentBreath;

    private void Start()
    {
        currentBreath = maxBreath;
    }

    public void UpdateBreath(float amount)
    {
        currentBreath = Mathf.Clamp(currentBreath + amount, 0, maxBreath);
        UpdateUI();
    }

    private void UpdateUI()
    {
        breathBar.fillAmount = currentBreath / maxBreath;
    }
}
