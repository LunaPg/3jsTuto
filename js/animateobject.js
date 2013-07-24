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

// var camera
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
    cube2 =  new THREE.Mesh( 
                new THREE.CubeGeometry(
                    20
                    , 30
                    , 60) 
            );

    // Camera Instanciation 
    camera = new THREE.PerspectiveCamera(
            View_Angle
            , Aspect
            , FNear
            , FFar);
    scene.add(cube);
    scene.add(cube2);
    // We moved the cube 2 in order not to overlap the cube1
    cube2.position.x =- 100;
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
    // Date() begin a unit of time and a variable for the rotation of the cube.
    var timer = new Date().getTime();
    // rotation of the cube un x and y axes
    cube.rotation.x =timer/1000;
    cube.rotation.y = timer/1000;
    
    cube2.rotation.x =-timer/100000;
    cube2.rotation.y =- timer/1000;
    // render the scene after moving the camera           
    renderer.render(scene, camera);
}
