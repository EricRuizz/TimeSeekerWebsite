export function IsHardwareAccelerationOff(): boolean //Not 100% reliable
{
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
    
        if (!gl)
        {
            return true;
        } 
    
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'unknown';
    
        return /swiftshader|llvmpipe|software/i.test(renderer);
    } catch {
        return true;
    }
}