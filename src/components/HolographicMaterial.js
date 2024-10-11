import { ShaderMaterial, Clock, Uniform, Color, AdditiveBlending, FrontSide } from 'three';

class HolographicMaterial extends ShaderMaterial {
  constructor(parameters = {}) {
    super();

    this.vertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        vViewPosition = -mvPosition.xyz;
        vNormal = normalMatrix * normal;
      }
    `;

    this.fragmentShader = `
      uniform float time;
      uniform float fresnelOpacity;
      uniform float scanlineSize;
      uniform float fresnelAmount;
      uniform float signalSpeed;
      uniform float hologramBrightness;
      uniform float hologramOpacity;
      uniform bool blinkFresnelOnly;
      uniform bool enableBlinking;
      uniform vec3 hologramColor;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      float flicker(float amt, float time) {
        return clamp(fract(cos(time) * 43758.5453123), amt, 1.0);
      }

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        // Hologram color
        vec4 color = vec4(hologramColor, hologramBrightness);

        // Scanlines
        float scanline = sin(vUv.y * scanlineSize + time * signalSpeed) * 0.1 + 0.9;
        color.rgb *= scanline;

        // Fresnel effect
        float fresnel = pow(1.0 - abs(dot(viewDir, normal)), fresnelAmount);
        fresnel = clamp(fresnel, 0.0, fresnelOpacity);

        // Blinking effect
        float blink = enableBlinking ? flicker(0.8, time * signalSpeed * 0.1) : 1.0;

        // Final color composition
        vec3 finalColor;
        if (blinkFresnelOnly) {
          finalColor = color.rgb + fresnel * blink * hologramColor;
        } else {
          finalColor = color.rgb * blink + fresnel * hologramColor;
        }

        gl_FragColor = vec4(finalColor, hologramOpacity);
      }
    `;

    this.uniforms = {
      time: { value: 0 },
      fresnelOpacity: { value: parameters.fresnelOpacity ?? 1.0 },
      fresnelAmount: { value: parameters.fresnelAmount ?? 2.0 },
      scanlineSize: { value: parameters.scanlineSize ?? 100.0 },
      hologramBrightness: { value: parameters.hologramBrightness ?? 1.0 },
      signalSpeed: { value: parameters.signalSpeed ?? 1.0 },
      hologramColor: { value: new Color(parameters.color ?? "#00d5ff") },
      enableBlinking: { value: parameters.enableBlinking ?? true },
      blinkFresnelOnly: { value: parameters.blinkFresnelOnly ?? false },
      hologramOpacity: { value: parameters.hologramOpacity ?? 1.0 },
    };

    this.clock = new Clock();
    this.transparent = true;
    this.blending = AdditiveBlending;
    this.side = FrontSide;
  }

  update() {
    this.uniforms.time.value = this.clock.getElapsedTime();
  }
}

export default HolographicMaterial;