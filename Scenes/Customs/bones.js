var CreateBonesTestScene = function (engine) {
    var scene = new BABYLON.Scene(engine);
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), scene);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 30, 0), scene);
    camera.setPosition(new BABYLON.Vector3(50, 500, -1000));
    light.position = new BABYLON.Vector3(20, 150, 70);
    camera.minZ = 10.0;

    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);

    // Ground
    var ground = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 1, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.material = groundMaterial;
    ground.receiveShadows = true;

    // Shadows
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

    // Dude
    BABYLON.SceneLoader.ImportMesh("him", "Scenes/Dude/", "Dude.babylon", scene, function (newMeshes, particleSystems, skeletons) {

        newMeshes[0].position = new BABYLON.Vector3(0, 0, 5);  // The original dude
        scene.beginAnimation(skeletons[0], 0, 120, 1.0, true);

        dudes = [];

        for (i = 0; i < 400; i++) {
            var xrand = Math.floor(Math.random() * 1001) - 500;
            var zrand = Math.floor(Math.random() * 1001) - 500;

            var c = [];

            for (j = 1; j < newMeshes.length; j++) {
                c[j] = newMeshes[j].clone("c" + j);
                c[j].position = new BABYLON.Vector3(xrand, 0, zrand);
                c[j].skeleton = newMeshes[j].skeleton.clone();
                scene.beginAnimation(c[j].skeleton, 0, 120, 1.0, true);
            }
            dudes[i] = c;
        }
    });

    return scene;
};