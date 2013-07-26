// Everythinng of the script is inside a lauch function
// To do so, every variable and function are not accessible outside this scope
// and every object are destruct rignt after the lauch of the function

function launch(){
    var camera, scene, renderer, cube, dirlight;
    // Where do we display the sceen in th html DOM
    var $container ;

    // function called when lauchin cameramoves.html on browser
    // initialization of all var for 3D scene
    init();
    animate();

    function init(){
        // Scene Var
        var SWidth = 800, 
            SHeight = 700;
        $container = $('#container');

        // Camera Var
        // F = Frustrum : Quite difficulte to translate in french :P
        // FR : Aire totale de la pyramide lors que l'on coup 1/3 voir 1/4
        // de sa hauteur vers le pointu du cone.
        // En gros une pyramide sans pointe.
        // http://fr.wikipedia.org/wiki/Tronc_(g%C3%A9om%C3%A9trie)#Cas_du_c.C3.B4ne_et_de_la_pyramide
        var View_Angle = 30
            , Aspect = SWidth / SHeight
            , FNear = 1
            , FFar = 1000;

        // Cube Var
        var CWidth = 40
            , CHeight = 40
            , CDepth = 40;

        renderer = new THREE.WebGLRenderer({
            antialias       : true, // to get smoother output
        });
        scene = new THREE.Scene();
        var cubeMaterial =
            new THREE.MeshLambertMaterial(
            {
                color: 0xFFFFCC
            });// create a new mesh with cube geometry 
        renderer.setClearColor(0xEEEEEE, 1.0);
        renderer.clear();
        renderer.shadowCameraFov = 50;
        renderer.shadowMapWidth = 1024;;
        renderer.shadowMapHeight = 1024;
//        renderer.shadowMapEnabled = true;
        cube =  new THREE.Mesh( 
            new THREE.CubeGeometry(
                CWidth
                , CHeight
                , CDepth)
            , cubeMaterial
        );
        cube.castShadow = true;
        cube.receiveShadow = true;
        // Camera Instanciation
        camera = new THREE.OrthographicCamera( SWidth / - 2, SWidth / 2, SHeight / 2, SHeight / - 2, FNear, FFar );
        var dirlight   = new THREE.SpotLight( 0x8888FF, 2 );
        dirlight.target.position.set( 170, 300, -120 );
        dirlight.castShadow = true;
        var terre = new THREE.Mesh( 
            new THREE.PlaneGeometry(400, 200, 1, 100)
        );
//        terre.rotation.x = -Math.PI/2;
        terre.position.y = -25.1;
        terre.receiveShadow = true;

        var light = new THREE.AmbientLight( 0x9999FF ); // soft white light
        scene.add( dirlight );
        scene.add(cube);
        scene.add(terre);
        // add the camera to the scene
        scene.add(camera);
        // the camera starts at 0,0,0
        // so pull it back
      camera.position.z =100;
 //       camera.lookAt (scene.position);

//       scene.add( light );
//        console.log(dirlight);
        // start the renderer
        renderer.setSize(SWidth, SHeight);

        // attach the render-supplied DOM element
        $container.append(renderer.domElement);

        // before rendering the scene, lets move our cubes in the scene

        // render the seen
        renderer.render(scene, camera);
        // binding mousewheel
        $('#container').bind('mousewheel', function(event, delta, deltaX, deltaY) {
            var fov =- deltaY*0.05;
            camera.projectionMatrix = THREE.Matrix4.makePerspective( fov, window.innerWidth / window.innerHeight, 1, 1100 );

//            camera.position.z =+ Math.floorMath.sin(deltaY )
            console.log(delta, deltaX, deltaY);
        });
    }

    // Animate function allow object to move with requestAnimationFrame
    function animate() {
        // Animate function
        requestAnimationFrame( animate )
        render()
    }

    function render (){
        // Get the time to move object every milliseconds
        var timer = new Date().getTime()  ;
    cube.rotation.x =timer/1000;
    cube.rotation.y = timer/1000;
    

        // Move the camera in a circle with the pivot point in the centre of this circle...
        // ...so that the pivot point, and focus of the camera is on the centre of our scene.
//        camera.position.x = Math.floor(Math.cos( timer )* 200);
//        camera.position.y = Math.floor(Math.cos( timer )* 200);
//        camera.position.z = Math.floor(Math.sin( timer ) * 200);
        // Ask the camera to look at the scene.
        // If you don't do it, the camera will shacking or look elsewhere.
        // pretty cool to have it !!
        // render the scene after moving the camera           
        renderer.render(scene, camera);
    }
} launch();
