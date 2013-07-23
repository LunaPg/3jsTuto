// Scene Var
var SWidth = 2200, 
    SHeight = 500;

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

var renderer = new THREE.WebGLRenderer();

var scene = new THREE.Scene();

// create a new mesh with cube geometry 
var cube =  new THREE.Mesh( 
                new THREE.CubeGeometry(
                    CWidth
                    , CHeight
                    , CDepth) 
                );

var cube2 =  new THREE.Mesh( 
                new THREE.CubeGeometry(70, 30, 30) 
                );
var cube3 =  new THREE.Mesh( 
                new THREE.CubeGeometry(50, 60, 10) 
                );
var cube4 =  new THREE.Mesh( 
                new THREE.CubeGeometry(20, 20, 50) 
                );

    // Camera Instanciation 
var camera = new THREE.PerspectiveCamera(
        View_Angle
        , Aspect
        , FNear
        , FFar);

// add the camera to the scene
scene.add(camera);

// add the cube to the scene
scene.add(cube);
scene.add(cube2);
scene.add(cube3);
scene.add(cube4);

// the camera starts at 0,0,0
// so pull it back
 camera.position.z = 300;

// start the renderer
renderer.setSize(SWidth, SHeight);

// attach the render-supplied DOM element
$container.append(renderer.domElement);

// before rendering the scene, lets move our cubes in the scene

// rotation on x axe
cube.rotation.x -= 0.2;
// position on y  axe
cube.position.y -= 50;

cube2.rotation.x += 0.5;
cube2.position.x += 50;
cube3.rotation.x += 1;
cube3.position.x -= 100;
cube4.position.y += 50;
cube4.rotation.y += 1;
// render the seen
renderer.render(scene, camera);

