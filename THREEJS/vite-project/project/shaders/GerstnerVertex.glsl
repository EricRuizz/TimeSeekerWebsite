uniform float uTime;
uniform float uHeight;
varying float vHeight;

vec3 displace(vec3 point) {

  vec3 p = point;

  p.y += uTime * 2.0;

  //                                  seed, persistance,  lacunarity, scale,  redistribution, octaves,  terbulance, ridge
  gln_tFBMOpts fbmOpts = gln_tFBMOpts(1.0,  0.4,          2.3,        0.1,    1.0,            5,        false,      false);
  
  //                                                Direction, steepness, wavelength
  gln_tGerstnerWaveOpts A = gln_tGerstnerWaveOpts(vec2(0.5, -0.5), 0.3, 0.5);
  gln_tGerstnerWaveOpts B = gln_tGerstnerWaveOpts(vec2(0.0, 1.0), 0.25, 1.0);
  gln_tGerstnerWaveOpts C = gln_tGerstnerWaveOpts(vec2(-0.5, 0.5), 0.15, 1.25);
  gln_tGerstnerWaveOpts D = gln_tGerstnerWaveOpts(vec2(1.0, 0.0), 0.25, 0.75);
  gln_tGerstnerWaveOpts E = gln_tGerstnerWaveOpts(vec2(0.5, 0.25), 0.30, 1.0);
  gln_tGerstnerWaveOpts F = gln_tGerstnerWaveOpts(vec2(0.25, -0.5), 0.15, 0.5);

  vec3 n = vec3(0.0);

  if(p.z >= uHeight / 2.0) {
      n.z += gln_normalize(gln_pfbm(p.xy + (uTime * 1.5), fbmOpts));
      n += gln_GerstnerWave(p, A, uTime).xzy;
      n += gln_GerstnerWave(p, B, uTime).xzy;
      n += gln_GerstnerWave(p, C, uTime).xzy;
      n += gln_GerstnerWave(p, D, uTime).xzy;
      n += gln_GerstnerWave(p, E, uTime).xzy;
      n += gln_GerstnerWave(p, F, uTime).xzy;
  }

  vHeight = n.z;

  point += n;

  vec2 pos = vec2(0, 4);

  //Camera sink
  float maxSink = 1.5;
  float effectRadius = 4.0;
  float deepnessCoef = 1.0;
  float offset = 1.0;
  vec2 distanceToCam = point.xy - pos;

  float cameraClosenessCoef = length(distanceToCam * deepnessCoef) * effectRadius;

  point.z += length(clamp(distanceToCam, -effectRadius, effectRadius)) * 1.0;
  
  point.z *= 0.4;
  point.z -= offset;

  return point;
}  

vec3 orthogonal(vec3 v) {
  return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0)
  : vec3(0.0, -v.z, v.y));
}

vec3 recalcNormals(vec3 newPos) {
  float offset = 0.001;
  vec3 tangent = orthogonal(normal);
  vec3 bitangent = normalize(cross(normal, tangent));
  vec3 neighbour1 = position + tangent * offset;
  vec3 neighbour2 = position + bitangent * offset;

  vec3 displacedNeighbour1 = displace(neighbour1);
  vec3 displacedNeighbour2 = displace(neighbour2);

  vec3 displacedTangent = displacedNeighbour1 - newPos;
  vec3 displacedBitangent = displacedNeighbour2 - newPos;

  return normalize(cross(displacedTangent, displacedBitangent));
}


void main() {
  csm_Position = displace(position);
  csm_Normal = recalcNormals(csm_Position);
}