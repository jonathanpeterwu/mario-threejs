function Cube( geometry, position, color ) {
  this.color = new THREE.Color( color )
  this.mesh = new THREE.Mesh( geometry )
  this.mesh.position.x = position.x
  this.mesh.position.y = position.y
  this.mesh.position.z = position.z
}

function CubeCreature(){
  this.cubes = []
  this.materials = []
}

CubeCreature.prototype = {
  mergeCubes: function( geometryToMerge ){
    for ( var i=0, len = this.cubes.length; i < len; i++ ){
      this.materials.push ( new THREE.MeshLambertMaterial({ color: this.cubes[ i ].color }) )
      THREE.GeometryUtils.setMaterialIndex(this.cubes[ i ].mesh.geometry, i )
      THREE.GeometryUtils.merge( geometryToMerge, this.cubes[ i ].mesh )
    }
  }
}
