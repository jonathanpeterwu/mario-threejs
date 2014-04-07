window.addEventListener('load', initialize)

function initialize() {
  // world init
  var world = new World()
  world.setRender()
  world.setCameraPosition()
  world.setLighting()

  // geometry,mesh,material init
  var geometry = new THREE.CubeGeometry( 1, 1, 1 )
  var material = new THREE.MeshLambertMaterial()
  var mergedMarioGeometry = new THREE.Geometry()
  var cubes = []
  var materials = []

  // creates Cube objects from our mario JSON
  for ( var i = 0; i < mario.cubeAttributes.length; i++ ){
    cubes.push ( new Cube( geometry, mario.cubeAttributes[ i ].position, material, mario.cubeAttributes[ i ].color ) )
  }

  // merge each Cube's mesh into the mergedMarioGeometry.
  for ( var i = 0; i < cubes.length; i++ ){
    materials.push ( new THREE.MeshLambertMaterial({ color: cubes[ i ].color }) )
    THREE.GeometryUtils.setMaterialIndex(cubes[ i ].mesh.geometry, i )
    THREE.GeometryUtils.merge( mergedMarioGeometry, cubes[ i ].mesh )
  }

  var mergedMarioMesh = new THREE.Mesh( mergedMarioGeometry ,new THREE.MeshFaceMaterial( materials ) )
  world.setScene( mergedMarioMesh )
  world.render( mergedMarioMesh )
}

function Cube( geometry, position, material, color ) {
  this.color = new THREE.Color( color )
  this.mesh = new THREE.Mesh( geometry, material )
  this.mesh.position.x = position.x
  this.mesh.position.y = position.y
  this.mesh.position.z = position.z
}

World = function(){
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, .1, 100 );
  this.renderer = new THREE.WebGLRenderer();
  this.controls = new THREE.OrbitControls( this.camera );
}

World.prototype = {
  setRender: function() {
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
  },

  render: function( mesh ) {
    var self = this
    requestAnimationFrame( function(){
     self.render( mesh )
   });

    this.renderer.render( this.scene, this.camera );
  },

  setCameraPosition: function(){
    this.camera.position.z = 30;
    this.camera.position.x = 4;
    this.camera.position.y = 3;
  },

  setLighting: function() {
    var frontLight = new THREE.DirectionalLight( 0xFFFFFF );
    frontLight.position.set( 3, 1, 10 ).normalize();
    var ambientLight = new THREE.AmbientLight( 0x555555 );
    this.scene.add( frontLight );
    // this.scene.add( ambientLight );
  },

  setScene: function( mesh ) {
    this.scene.add( mesh );
  }
}
