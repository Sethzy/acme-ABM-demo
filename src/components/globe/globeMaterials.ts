import * as THREE from "three";

export const GLOBE_RADIUS = 1;
export const ARC_RADIUS = 1.008;
export const MARKER_RADIUS = 1.012;
export const CAMERA_Z = 3.6;

export const INK_COLOR = new THREE.Color("#002b5c");
export const OCEAN_COLOR = new THREE.Color("#edf4fb");
export const OCEAN_EMISSIVE_COLOR = new THREE.Color("#d6e8f7");
export const ATMOSPHERE_COLOR = new THREE.Color("#7db5f0");
export const RIM_MATTE_COLOR = new THREE.Color("#fbfcfe");

export function getCameraDistance(width: number) {
  if (width < 640) return 4.82;
  if (width < 1024) return 4.55;
  return CAMERA_Z;
}

export function createGlobeShell() {
  const group = new THREE.Group();

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_RADIUS, 96, 96),
    new THREE.MeshStandardMaterial({
      color: OCEAN_COLOR,
      roughness: 0.86,
      metalness: 0,
      emissive: OCEAN_EMISSIVE_COLOR,
      emissiveIntensity: 0.13,
    }),
  );
  group.add(sphere);

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.032, 96, 96),
    new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        glowColor: { value: ATMOSPHERE_COLOR },
      },
      vertexShader: `
        varying vec3 vNormal;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;

        void main() {
          float edge = 1.0 - abs(vNormal.z);
          float alpha = pow(edge, 2.6) * 0.135;
          gl_FragColor = vec4(glowColor, alpha);
        }
      `,
    }),
  );
  group.add(atmosphere);

  return group;
}

export function createLimbMatte() {
  const limbMatte = new THREE.Mesh(
    new THREE.SphereGeometry(1.004, 96, 96),
    new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.FrontSide,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        matteColor: { value: RIM_MATTE_COLOR },
      },
      vertexShader: `
        varying vec3 vNormal;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 matteColor;
        varying vec3 vNormal;

        void main() {
          float edge = 1.0 - abs(vNormal.z);
          float alpha = smoothstep(0.8, 1.0, edge) * 0.18;
          gl_FragColor = vec4(matteColor, alpha);
        }
      `,
    }),
  );
  limbMatte.renderOrder = 8;
  return limbMatte;
}

export function createRim() {
  return new THREE.Mesh(
    new THREE.SphereGeometry(1.012, 96, 96),
    new THREE.MeshBasicMaterial({
      color: INK_COLOR,
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide,
      depthWrite: false,
    }),
  );
}
