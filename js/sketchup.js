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


var loader = new THREE.ColladaLoader();
    // Camera Instanciation 
var camera = new THREE.PerspectiveCamera(
        View_Angle
        , Aspect
        , FNear
        , FFar);

// add the camera to the scene
scene.add(camera);
// start the renderer
renderer.setSize(SWidth, SHeight);

// attach the render-supplied DOM element
$container.append(renderer.domElement);

// the camera starts at 0,0,0
// so pull it back
 camera.position.z = 20;
loader.load('3Dmodels/coeur.dae', function (result) {
    scene.add(result.scene);
    result.scene.rotation.y +=15
renderer.render(scene,camera);
});



// render the seen
//renderer.render(scene, camera);
function render() {
        requestAnimationFrame(render);
            renderer.render(scene, camera);
}
render();
