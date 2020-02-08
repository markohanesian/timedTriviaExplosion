var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      var geometry = new THREE.BoxGeometry();
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      var cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // New Java Below
      camera.position.set(-5, 0, 7);
      // camera.position.z = 5; old camera position

      function createMaterials() {
        // we'll create a red materials for the body
        // and a dark grey material for the details here
        const body = new THREE.MeshStandardMaterial({
          color: 0xff3333, // red
          flatShading: true
        });

        // just as with textures, we need to put colors into linear color space
        body.color.convertSRGBToLinear();

        const detail = new THREE.MeshStandardMaterial({
          color: 0x333333, // darkgrey
          flatShading: true
        });

        detail.color.convertSRGBToLinear();

        return {
          body,
          detail
        };
      }

      function createGeometries() {
        // we'll create geometries for the nose, cabin, chimney, and wheels here
      }

      function createMeshes() {
        const materials = createMaterials();
        const geometries = createGeometries();
      }

      const train = new THREE.Group();
      scene.add(train);

      // New Java Above
      var animate = function() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      };

      animate();