// Everythinng of the script is inside a lauch function
// To do so, every variable and function are not accessible outside this scope
// and every object are destruct rignt after the lauch of the function

function launch(){
    var camera, scene, renderer, cube, dirlight ;
    // Where do we display the sceen in th html DOM
    var $container ;

    // function called when lauchin cameramoves.html on browser
    // initialization of all var for 3D scene
    init();
    animate();

    function init(){
        // Scene Var
        // window.innerWidth / window.innerHeight
       // var SWidth = window.innerWidth , 
       //     SHeight = window.innerHeight;

        var SWidth = 2200 , 
            SHeight = 500;
        $container = $('#container');
        // Camera Var
        // F = Frustrum : Quite difficulte to translate in french :P
        // FR : Aire totale de la pyramide lors que l'on coup 1/3 voir 1/4
        // de sa hauteur vers le pointu du cone.
        // En gros une pyramide sans pointe.
        // http://fr.wikipedia.org/wiki/Tronc_(g%C3%A9om%C3%A9trie)#Cas_du_c.C3.B4ne_et_de_la_pyramide
        var ViewAngle = 40
            , Aspect = SWidth / SHeight
            , FNear = 1
            , FFar = 10000;

        // Cube Var
        var CWidth = 100
            , CHeight = 100
            , CDepth = 50;


        // Instanciation of the canvas : If WebGL enabled : GO FOR IT !
        if (window.WebGLRenderingContext){
            renderer = new THREE.WebGLRenderer();
            console.log("WEBGLRenderer !", renderer)
            }
        else{
            renderer = new THREE.CanvasRenderer();
            console.log("CanvaRenderer !", renderer)
        }
        scene = new THREE.Scene();

        /************** CUBE *************************/
        var cubeMaterial =
            new THREE.MeshLambertMaterial(
            {
                color: 0xFFFFCC
            });// create a new mesh with cube geometry 
        cube =  new THREE.Mesh( 
            new THREE.CubeGeometry(
                CWidth
                , CHeight
                , CDepth)
            , cubeMaterial
        );
//        cube.castShadow = true;
//        cube.receiveShadow = true;

        /******************** CAMERA *****************/
        // Camera Instanciation
        camera = new THREE.PerspectiveCamera( ViewAngle, Aspect, FNear, FFar );
        console.log(camera.position.x);
        camera.position.z = 500;
//        camera.position.x = radious * Math.sin( Cameratheta * Math.PI / 360 ) * Math.cos( Cameraphi * Math.PI / 360 );
//        camera.position.y = radious * Math.sin(Cameraphi * Math.PI / 360 );
//        camera.position.z = radious * Math.cos( Cameratheta * Math.PI / 360 ) * Math.cos( Cameraphi * Math.PI / 360 );
        console.log(camera);


        /************** SPOT LIGHT ************/
        var dirlight   = new THREE.SpotLight( 0x8888FF, 2 );
        dirlight.target.position.set( 170, 300, 120 );
        dirlight.intensity = 1.5
        dirlight.castShadow = true;
        var terre = new THREE.Mesh( 
            new THREE.PlaneGeometry(300, 500, 1,2) 
        );
        terre.rotation.x = -Math.PI/3;
        
        terre.position.y = -120;
        terre.position.z= 10;
        terre.receiveShadow = true;

        //TrackballControls is a new library that control every single parameter
        // theta, phi and all of this geometry braincrash of the mouse
        // Big Up to you, http://egraether.com/
        // You only have to attached an object to it to make it move with your mouse
        controls = new THREE.TrackballControls( camera );
        controls.target.set( 0, 0, 0 )
        controls.panSpeed = 0.8;
        controls.keys = [ 65, 83, 68 ];

        var light = new THREE.AmbientLight( 0x9999FF ); // soft white light
        scene.add( dirlight );
        scene.add( light );
        scene.add(cube);
        scene.add(terre);
        // add the camera to the scene
        scene.add(camera);
        // the camera starts at 0,0,0
        // so pull it back
//       camera.lookAt (scene);
        console.log(scene.position);
        // start the renderer
        renderer.setSize(SWidth, SHeight);

        // attach the render-supplied DOM element
        $container.append(renderer.domElement);

        // before rendering the scene, lets move our cubes in the scene
//       renderer.setClearColor(0xEEEEEE, 1.0);
//        renderer.clear();
//        renderer.shadowCameraFov = 50;
//        renderer.shadowMapWidth = SWidth;
//        renderer.shadowMapHeight = SHeight;

//        renderer.shadowMapENabled = true;
        // render the seen
        renderer.render(scene, camera);
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

        // render the scene after moving the camera           
        controls.update();
        renderer.render(scene, camera);
    }

} launch();
