function Soil() {
  var topPoints = [];
  var i;
  for ( i = 10; i >= 0; i-- ) {
    topPoints.push(new THREE.Vector2(i, Math.cos(Math.PI/20*i)));
  }
  var bottomPoints = [];
  for ( i = 0; i <= 10; i++ ) {
    bottomPoints.push(new THREE.Vector2(i, -2*(1+Math.cos(Math.PI/10*i))));
  }

  var topGeometry = new THREE.LatheGeometry( topPoints, 6);
  var topMaterial = new THREE.MeshLambertMaterial( { color: 0x344b37 } );

  this.top = new THREE.Mesh( topGeometry, topMaterial );
  this.top.castShadow = true;
  this.top.receiveShadow = true;

  var rimGeometry = new THREE.TorusGeometry(10, 0.5, 16, 6);

  this.rim = new THREE.Mesh(rimGeometry, topMaterial);
  this.rim.rotation.x = Math.PI/2;
  this.rim.rotation.z = Math.PI/2;
  this.rim.position.y = -0.5;

  this.group = new THREE.Group();
  this.stoneSnow = new THREE.Group();
  this.groundSnow = new THREE.Group();
  this.stoneMoss = new THREE.Group();

  this.group.add(this.stoneSnow);
  this.group.add(this.stoneMoss);
  this.group.add(this.groundSnow);

  var snowMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } );
  this.snowTop = new THREE.Mesh( topGeometry, snowMaterial );
  this.snowTop.position.y = -0.05;

  var snowRimGeometry = new THREE.TorusGeometry(10, 0.45, 16, 6);
  this.snowRim = new THREE.Mesh(snowRimGeometry, snowMaterial);
  this.snowRim.rotation.x = Math.PI/2;
  this.snowRim.rotation.z = Math.PI/2;
  this.snowRim.position.y = -0.5;
  this.groundSnow.add(this.snowTop);
  this.groundSnow.add(this.snowRim);

  var bottomGeometry = new THREE.LatheGeometry( bottomPoints, 6 );
  var bottomMaterial = new THREE.MeshLambertMaterial( { color: 0x917054 } );
  this.bottom = new THREE.Mesh( bottomGeometry, bottomMaterial );
  this.bottom.position.y = -0.8;
  this.bottom.castShadow = true;

  this.group.add(this.top);
  this.group.add(this.rim);
  this.group.add(this.bottom);

  var material = new THREE.MeshLambertMaterial( {color: 0x423224} );

  for ( i = 0; i < 90; i++) {
    var size = Math.random()*0.7 + 0.25;
    var geometry = new THREE.BoxGeometry(size, size, size);
    var x = 1 + Math.random() * 6;
    geometry.translate(x, 0, 0);
    var clod = new THREE.Mesh(geometry, material);
    clod.position.y = -3*(1+Math.cos(Math.PI/10*x))*Math.random() - 0.5;
    clod.quaternion.setFromEuler(rotateAndTilt(Math.random() * 90, Math.random() * 360));
    this.group.add(clod);
    clod.receiveShadow = true;

  }

  var stoneMaterial = new THREE.MeshLambertMaterial( {color: 0x656b59} );
  var mossMaterial = new THREE.MeshLambertMaterial( {color: 0x4d5e35} );

  for ( i = 0; i < 8; i++) {
    var radius = Math.random() + 0.5;
    var stoneGeometry = new THREE.SphereGeometry(radius, 8, 8 );
    var snowGeometry = new THREE.SphereGeometry(radius * 0.9, 8, 8);
    var mossGeometry = new THREE.SphereGeometry(radius * 0.95, 8, 8);

    var x = 2 + Math.random() * 6.5;
    stoneGeometry.translate(x, 0, 0);
    snowGeometry.translate(x, 0, 0);
    mossGeometry.translate(x, 0, 0);

    var stone = new THREE.Mesh( stoneGeometry, stoneMaterial );
    var snow = new THREE.Mesh(snowGeometry, snowMaterial);
    var moss = new THREE.Mesh(mossGeometry, mossMaterial);

    position = Math.cos(Math.PI/20*x);
    eu = rotateAndTilt(Math.random() * 90, Math.random() * 360);

    stone.position.y = position;
    snow.position.y = position;
    moss.position.y = position;

    stone.quaternion.setFromEuler(eu);
    snow.quaternion.setFromEuler(eu);
    moss.quaternion.setFromEuler(eu);

    stone.scale.set(1, 0.5, 1);
    snow.scale.set(1, 0.5, 1);
    moss.scale.set(1, 0.5, 1);

    this.group.add(stone);
    this.stoneSnow.add(snow);
    this.stoneMoss.add(moss);
  }

  this.stoneMoss.position.y = 0.07;
  this.group.scale.set(0.05, 0.05, 0.05);
}

Soil.prototype.update = function(time) {


  var snowHeight = -Math.sin(time.seasonRad) * 0.3;
  if (snowHeight > 0) {
    this.stoneSnow.position.y = -Math.sin(time.seasonRad) * 0.4;
    this.groundSnow.position.y = -Math.sin(time.seasonRad) * 0.09;
    this.groundSnow.scale.set(1, 1 + snowHeight * 0.2, 1);  }
};
