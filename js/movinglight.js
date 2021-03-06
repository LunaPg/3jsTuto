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
        var SWidth = window.innerWidth , 
            SHeight = window.innerHeight;

//        var SWidth = 2200 , 
//            SHeight = 500;
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
            renderer = new THREE.WebGLRenderer( { antialiasing: true } );
            }
        else{
            renderer = new THREE.CanvasRenderer();
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

        /******************** CAMERA *****************/
        // Camera Instanciation
        camera = new THREE.PerspectiveCamera( ViewAngle, Aspect, FNear, FFar );
        camera.position.z = 500;


        /************** SPOT LIGHT ************/
        var dirlight   = new THREE.DirectionalLight( 0xFFFFFF, 1 );
        dirlight.position.x = 150;
        dirlight.position.y = 150;
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
        controllight = new THREE.TrackballControls( dirlight );
        controls.target.set( 0, 0, 0 )
        controls.panSpeed = 0.8;
        controls.keys = [ 65, 83, 68 ];
        console.log(controls);
        var light = new THREE.AmbientLight( 0x9999FF ); // soft white light
        scene.add( dirlight );
        scene.add( light );
        scene.add(cube);
        scene.add(terre);
        // add the camera to the scene
        scene.add(camera);
        // the camera starts at 0,0,0
        // so pull it back
       
        // start the renderer
        renderer.setSize(SWidth, SHeight);

        // attach the render-supplied DOM element
        $container.append(renderer.domElement);

        // before rendering the scene, lets move our cubes in the scene
        renderer.shadowMapEnabled = true;
        renderer.shadowMapSoft = false;

        renderer.shadowCameraNear = 3;
        renderer.shadowCameraFar = camera.far;
        renderer.shadowCameraFov = 50;

        renderer.shadowMapBias = 0.0039;
        renderer.shadowMapDarkness = 0.5;
        renderer.shadowMapWidth = 1024;
        renderer.shadowMapHeight = 1024;

        dirlight.castShadow = true;
        cube.castShadow = true;
        terre.receiveShadow = true;
       // render the seen
        $('#container').bind('mousemove', function(e) {
            var modif = e.clientX+e.clientY;
            couleur ="0x"+ (0x1000000+(modif)*0xffffff).toString(16).substr(1,6)

            console.log(couleur);
            cube.material.color.setHex(couleur)
        });
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
        controllight.update();
        renderer.render(scene, camera);
    }

} launch();
