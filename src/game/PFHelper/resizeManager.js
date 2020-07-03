class ResizeManager extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager);

    this.scene = scene;
    this.objects = [];
  }

  add(
    object = {},
    resizeFunction = () => {
      return false;
    }
  ) {
    this.objects.push(object);
    object.resize = resizeFunction;
    object.resize(this.scene.resizeWidth, this.scene.resizeHeight);
  }

  remove(object = {}) {
    let objects = this.objects;
    let objectIndex = objects.indexOf(object);
    if (objectIndex === -1) return;
    objects.splice(objectIndex, 1);
  }

  resize(w = 0, h = 0) {
    if (!w) w = this.scene.resizeWidth;
    if (!h) h = this.scene.resizeHeight;

    this.objects.forEach(object => {
      object.resize && object.resize(w, h);
    });
  }

  reset() {
    for (let o of this.objects) {
      o.resize = null;
    }

    this.objects = [];
  }
}

export default ResizeManager;