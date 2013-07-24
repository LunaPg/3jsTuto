// Scene Var
var SWidth = 2200, 
    SHeight = 500;
var camera, scene, renderer, cube;
// Camera Var
// F = Frustrum : Quite difficulte to translate in french :P
// FR : Aire totale de la pyramide lors que l'on coup 1/3 voir 1/4
// de sa hauteur vers le pointu du cone.
// En gros une pyramide sans pointe.
// http://fr.wikipedia.org/wiki/Tronc_(g%C3%A9om%C3%A9trie)#Cas_du_c.C3.B4ne_et_de_la_pyramide
//
//
var View_Angle = 30
    , Aspect = SWidth / SHeight
    , FNear = 1
    , FFar = 1000;

// Cube Var
var CWidth = 40
    , CHeight = 40
    , CDepth = 40;
// Where do we display the sceen in th html DOM
var $container = $('#container');

// function called when lauchin cameramoves.html on browser
// initialization of all var for 3D scene
init();
// animation (here camera)
animate();

function init(){
    renderer = new THREE.WebGLRenderer();
    scene = new THREE.Scene();
    // create a new mesh with cube geometry 
    cube =  new THREE.Mesh( 
                new THREE.CubeGeometry(
                    CWidth
                    , CHeight
                    , CDepth) 
            );

    // Camera Instanciation 
    camera = new THREE.PerspectiveCamera(
            View_Angle
            , Aspect
            , FNear
            , FFar);
    scene.add(cube);
    // add the camera to the scene
    scene.add(camera);
    // the camera starts at 0,0,0
    // so pull it back
    camera.position.z =300;

    // start the renderer
    renderer.setSize(SWidth, SHeight);

    // attach the render-supplied DOM element
    $container.append(renderer.domElement);

    // before rendering the scene, lets move our cubes in the scene

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
    var timer = new Date().getTime() * 0.001 ;

    // Move the camera in a circle with the pivot point in the centre of this circle...
    // ...so that the pivot point, and focus of the camera is on the centre of our scene.
    camera.position.x = Math.floor(Math.cos( timer )* 200);
    camera.position.y = Math.floor(Math.cos( timer )* 200);
    camera.position.z = Math.floor(Math.sin( timer ) * 200);
    // Ask the camera to look at the scene.
    // If you don't do it, the camera will shacking or look elsewhere.
    // pretty cool to have it !!
    camera.lookAt (scene.position);
    // render the scene after moving the camera           
    renderer.render(scene, camera);
}
