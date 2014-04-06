window.addEventListener( 'load', initialize, false )

function initialize() {
  var world = new World()
  world.setRender();
  world.setCameraPosition();
  world.setLighting();

  var marioFactory = new CubeFactory()
  var mergedMarioGeometry = new THREE.Geometry()
  var mergedMarioMesh = new THREE.Mesh( mergedMarioGeometry, new THREE.MeshFaceMaterial() );

  for ( var i=0; i<mario.cubeAttributes.length; i++ ){
    marioFactory.createCube( mario.cubeAttributes[ i ].color, mario.cubeAttributes[ i ].position )
  };

  for ( var i=0; i<marioFactory.length; i++ ){
    mergeMario( mergedMarioMesh, marioFactory.cubes[ i ] )
  };

  // cubePlacer( mergedMarioMesh, world );
  world.setScene( mergedMarioMesh );
  world.render( mergedMarioMesh );
}


function mergeMario(newMesh, unmergedCube){
  THREE.GeometryUtils.merge(newMesh, unmergedCube)
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

    // mesh.rotation.x += 0.01;
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

function Cube( color, position ) {
  this.geometry = new THREE.CubeGeometry( 1, 1, 1 );
  this.material = new THREE.MeshLambertMaterial( {color: color} );
  this.mesh = new THREE.Mesh( this.geometry, this.material )
  this.mesh.position.x = position.x
  this.mesh.position.y = position.y
  this.mesh.position.z = position.z
}

function CubeFactory() {
  this.cubes = [];
}

CubeFactory.prototype = {
  createCube: function( color, position ){
    var cube = new Cube( color, position );
    this.cubes.push( cube );
    return cube
  }
}

function cubePlacer ( cubes, world ){
  for ( var i=0; i<cubes.length; i++ ){
    world.setScene( cubes[ i ].mesh );
    world.render( cubes[ i ].mesh );
  }
}
