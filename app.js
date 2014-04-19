window.addEventListener('load', initialize)

function initialize() {
  // world init
  var world = new World()
  world.setRender()
  world.setCameraPosition()
  world.setLighting()

  // geometry,mesh,material init
  var geometry = new THREE.CubeGeometry( 1, 1, 1 )
  var mergedMarioGeometry = new THREE.Geometry()
  var cubeMario = new CubeCreature()

  // creates Cube objects from our mario JSON
  for ( var i = 0, len = mario.cubeAttributes.length; i < len; i++ ){
    cubeMario.cubes.push ( new Cube( geometry, mario.cubeAttributes[ i ].position, mario.cubeAttributes[ i ].color ) )
  }

  // merge each Cube's mesh into the mergedMarioGeometry.
  cubeMario.mergeCubes(mergedMarioGeometry)

  // merge cubeMario.materials array into final mesh
  var mergedMarioMesh = new THREE.Mesh( mergedMarioGeometry, new THREE.MeshFaceMaterial( cubeMario.materials ) )
  world.setScene( mergedMarioMesh )
  world.render( mergedMarioMesh )
}
