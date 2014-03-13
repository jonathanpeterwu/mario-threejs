var mario = {
  cubeAttributes: [
    {
      color: "red",
      position:
              {
                x:1,
                y:1,
                z:1
              }
    }
  ]
}

window.addEventListener( 'load', initialize, false )

function initialize() {
  var world = new World()
  world.setRender();
  world.setCameraPosition();
  world.setLighting();

  var marioFactory = new CubeFactory()

  for ( var i=0; i<mario.cubeAttributes.length; i++ ){
    marioFactory.createCube( mario.cubeAttributes[ i ].color )
  }

  cubePlacer(marioFactory.cubes, world)


}


World = function(){
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, .1, 30 );
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

    mesh.rotation.x += 0.01;
    this.renderer.render( this.scene, this.camera );
  },

  setCameraPosition: function(){
    this.camera.position.z = 12;
    this.camera.position.x = 4;
    this.camera.position.y = 3;
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
  positionSelf: function(x, y, z) {
    //+1 makes it move by a lot, need to manage the camera.z attribute
    this.mesh.position.x = x
    this.mesh.position.y = y
    this.mesh.position.z = z
  }
}

function cubePlacer (cubes, world){
  for (var i=0; i<cubes.length; i++)
  {
    world.setScene(cubes[i].mesh);
    world.render(cubes[i].mesh);
    cubes[i].positionSelf( Math.random() *10, Math.random() *10, Math.random() *10);
  }
}

