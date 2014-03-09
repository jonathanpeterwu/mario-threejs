window.addEventListener( 'load', initialize, false )

function initialize() {
  var world = new World()
  world.setRender();
  world.setCameraPosition();
  world.setLighting();

  var marioFactory = new CubeFactory()
  var cube = marioFactory.createCube("blue")
  var cube2 = marioFactory.createCube("green")

  cube.positionSelf()
  for (var i=0; i<marioFactory.cubes.length; i++)
  {
    world.setScene(marioFactory.cubes[i].mesh);
    world.render(marioFactory.cubes[i].mesh);
  }

}


World = function(){
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, .1, 10 );
  this.renderer = new THREE.WebGLRenderer();
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

    mesh.rotation.x += 0.01;
    this.renderer.render( this.scene, this.camera );
  },

  setCameraPosition: function(){
    this.camera.position.z = 5;
    this.camera.position.x = 4;
    this.camera.position.y = 1;
  },

  setLighting: function() {
    var directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set( 3,1,10 ).normalize();
    this.scene.add( directionalLight );
  },

  setScene: function( mesh ) {
    this.scene.add( mesh );
  }
}

function Cube( color ) {
  this.geometry = new THREE.CubeGeometry(1,1,1);
  this.material = new THREE.MeshLambertMaterial( {color: color} );
  this.mesh = new THREE.Mesh(this.geometry, this.material)
}

function CubeFactory() {
  this.cubes = [];
}

CubeFactory.prototype = {
  createCube: function(color) {
    var cube = new Cube(color);
    this.cubes.push(cube);
    return cube
  }
}

Cube.prototype = {
  positionSelf: function() {
    console.log(this.mesh.position.x);
    //+1 makes it move by a lot, need to manage the camera.z attribute
    this.mesh.position.x = 2
  }
}



// Cube.prototype = {
//   createCube: function() {
//     console.log(this.geometry);
//     console.log(this.material);
//     var cube = new THREE.Mesh( this.geometry, this.material );
//     return cube;
//   }
// }
