Object.defineProperty(

    THREE.OrbitControls.prototype,
    'center',
    {
        get: function () {
            return this.target;
        },
        set: function (value) {
            this.target = value;
        }
    }
);


THREE.OrbitControls.prototype.focus = function (target) {
    let self = this;

    
    var box = new THREE.Box3();
    var sphere = new THREE.Sphere();
    var delta = new THREE.Vector3();
    var center = this.center;

    var distance;

    box.setFromObject(target);

    if (box.isEmpty() === false) {

        box.getCenter(center);
        distance = box.getBoundingSphere(sphere).radius;

    } else {

        // Focusing on an Group, AmbientLight, etc

        center.setFromMatrixPosition(target.matrixWorld);
        distance = 0.1;

    }

    delta.set(0, 0, 1);
    delta.applyQuaternion(self.object.quaternion);
    delta.multiplyScalar(distance * 4);

    self.object.position.copy(center).add(delta);

    self.dispatchEvent({type: 'change', newTarget: target});
}

THREE.PerspectiveCamera.prototype.setFromOrthographic = function (cameraOrtho, focuspoint) {

    this.rotation.copy(cameraOrtho.rotation);
    this.position.copy(cameraOrtho.position);

    let alpha = this.fov / 2;
    let frustumDistance = cameraOrtho.top / cameraOrtho.zoom;
    let focusDistance = frustumDistance / Math.tan(alpha * Math.PI / 180);
    let distanceToMove = this.position.distanceTo(focuspoint) - focusDistance;
    this.translateZ(-distanceToMove);
}

THREE.OrthographicCamera.prototype.setFromPerspective = function (cameraPerspective, focuspoint, newFocusDistance) {


    this.rotation.copy(cameraPerspective.rotation);
    this.position.copy(focuspoint);
    this.translateZ(newFocusDistance); // Camera fährt bei positiven z-werten nach hinten

    let focusDistance = cameraPerspective.position.distanceTo(focuspoint);
    console.log(focusDistance);
    let alpha = cameraPerspective.fov / 2;
    let frustumDistance = Math.tan(alpha * Math.PI / 180) * focusDistance;

    this.left = -frustumDistance * cameraPerspective.aspect;
    this.right = frustumDistance * cameraPerspective.aspect;
    this.top = frustumDistance;
    this.bottom = - frustumDistance;

    this.zoom = 1;

    this.updateProjectionMatrix();
}
