function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
	camera.lookAt(new THREE.Vector3(0,0,0));
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );
	
	var directionalLight = new THREE.DirectionalLight( 0x808080, 1 );
	directionalLight.position.set( 3, 1.5, 2 ).normalize();
	scene.add( directionalLight );
	
	var light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );

	// my code here
    var mesh = cube(new THREE.MeshPhongMaterial({specular:0xffffff,shineness:50,color:0xffffff,shading: THREE.SmoothShading}));
	scene.add(mesh)
	
    loop();
	
	var t=250
    function loop()
    {
        requestAnimationFrame( loop );
        camera.position.set( Math.sin(5*t/1000)*5, 2, Math.cos(5*t/1000)*5);
		camera.lookAt(new THREE.Vector3(0,0,0));
        renderer.render( scene, camera );
		t+=1
    }
}

function cube(material)
{
	g = new THREE.Geometry()
	
	g.vertices.push( new THREE.Vector3(-1, 1, 1) )
	g.vertices.push( new THREE.Vector3(1, 1, 1) )
	g.vertices.push( new THREE.Vector3(-1, -1, 1) )
	g.vertices.push( new THREE.Vector3(1, -1, 1) )
	g.vertices.push( new THREE.Vector3(-1, 1, -1) )
	g.vertices.push( new THREE.Vector3(1, 1, -1) )
	g.vertices.push( new THREE.Vector3(-1, -1, -1) )
	g.vertices.push( new THREE.Vector3(1, -1, -1) )
	
	var ful = 0  //too much of a brainfuck without renaming things
	var fur = 1
	var fll = 2
	var flr = 3
	var bul = 4
	var bur = 5
	var bll = 6
	var blr = 7
	
	face(g,ful,fur,fll,flr)
	face(g,bul,ful,bll,fll)
	face(g,bul,bur,ful,fur)
	face(g,fur,bur,flr,blr)
	face(g,fll,flr,bll,blr)
	face(g,bur,bul,blr,bll)
	
	g.computeFaceNormals();
	return new THREE.Mesh(g,material)
}

function face(g,ul,ur,ll,lr)
{
	triangle(g,ul,ll,ur),triangle(g,ur,ll,lr)
}

function triangle(g,v1,v2,v3)
{
	g.faces.push( new THREE.Face3( v1,v2,v3 ) )
}