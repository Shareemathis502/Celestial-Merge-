using UnityEngine;

public class HapticFeedback : MonoBehaviour
{
    public static void TriggerHaptic()
    {
        #if UNITY_ANDROID
        Handheld.Vibrate();
        #endif
    }
}
