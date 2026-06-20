import * as THREE from "three";
import { describe, expect, it } from "vitest";
import {
  cities,
  createRouteLayer,
  setRouteLayerOpacity,
} from "./globeRoutes";
import { latLngToVector } from "./landTexture";

function collectMaterialColors(object: THREE.Object3D) {
  const colors = new Set<string>();

  object.traverse((child) => {
    const material = (child as THREE.Mesh).material;
    const materials = Array.isArray(material) ? material : material ? [material] : [];

    for (const item of materials) {
      const color = (item as THREE.MeshBasicMaterial).color;
      if (color instanceof THREE.Color) colors.add(color.getHexString());
    }
  });

  return colors;
}

describe("globeRoutes", () => {
  it("marks the corridor origin hub with a red inner ring and SG flag", () => {
    const layer = createRouteLayer();

    expect(layer.hubRing).toBeNull();
    expect(collectMaterialColors(layer.group)).toContain("ef3340");
    expect(layer.hubFlag).toBeInstanceOf(THREE.Mesh);
    expect(layer.hubFlag?.userData.label).toBe("SG flag");
    expect(layer.hubFlag?.scale.x).toBe(0.14);
    const singaporeNormal = latLngToVector(cities.singapore.lat, cities.singapore.lng, 1).normalize();
    const east = new THREE.Vector3(0, 1, 0).cross(singaporeNormal).normalize();
    const north = singaporeNormal.clone().cross(east).normalize();
    const flagBelowOffset = layer.hubFlag!.position.dot(north);
    expect(flagBelowOffset).toBeLessThan(-0.08);
    expect(flagBelowOffset).toBeGreaterThan(-0.11);
    const flagMaterial = layer.hubFlag?.material as THREE.MeshBasicMaterial;
    expect(flagMaterial.depthTest).toBe(true);
    expect(flagMaterial.opacity).toBe(0.92);
  });

  it("uses a blue tint for quiet routes instead of grey", () => {
    const layer = createRouteLayer();
    const colors = collectMaterialColors(layer.group);

    expect(colors).toContain("6fa8dc");
    expect(colors).not.toContain("8b95a8");
  });

  it("keeps route layer opacity idempotent for route materials", () => {
    const layer = createRouteLayer();

    setRouteLayerOpacity(layer.group, layer.draws, 0.6);
    setRouteLayerOpacity(layer.group, layer.draws, 1);

    for (const draw of layer.draws) {
      const material = draw.mesh.material as THREE.MeshBasicMaterial;
      expect(material.opacity).toBeCloseTo(draw.opacity * draw.opacityRatio);
    }
  });
});
