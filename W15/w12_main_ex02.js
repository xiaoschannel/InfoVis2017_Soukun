var surfaces;
var volume;
var screen;
var cmap = [];
function main()
{
    volume = new KVS.LobsterData();
    screen = new KVS.THREEScreen();

	screen.init(volume, {width: window.innerWidth * 0.8, height: window.innerHeight,
		targetDom: document.getElementById('display'), enableAutoResize: false});

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var isovalue = 64;
	
	// Create a color map
    for ( var i = 0; i < 256; i++ )
    {
        var S = i / 255.0; // [0,1]
        var R = Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 );
        var G = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
        var B = Math.max( Math.cos( S * Math.PI ), 0.0 );
        var color = new THREE.Color( R, G, B );
        cmap.push( [ S, '0x' + color.getHexString() ] );
    }
	
    surfaces = Isosurfaces( volume, isovalue, cmap );
	surfaces.name = "surfaces";
    screen.scene.add( surfaces );

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

	window.addEventListener('resize', function() {
		screen.resize([ window.innerWidth * 0.8, window.innerHeight ]);
	});

    screen.loop();
}

function btnISO_Click()
{
	var obj = screen.scene.getObjectByName("surfaces");
	screen.scene.remove(obj);
	surfaces = Isosurfaces( volume,Math.round( document.getElementById("isovalue").value*255 ),cmap);
	surfaces.name = "surfaces";
	screen.scene.add(surfaces);
	animate();
}

function btnBW_Click()
{
	var obj = screen.scene.getObjectByName("surfaces");
	screen.scene.remove(obj);
	
	cmap=[];
	// Create a color map
    for ( var i = 0; i < 256; i++ )
    {
        var S = i / 255.0; // [0,1]
        var color = new THREE.Color( S, S, S );
        cmap.push( [ S, '0x' + color.getHexString() ] );
    }
	
	surfaces = Isosurfaces( volume,Math.round( document.getElementById("isovalue").value*255) ,cmap);
	surfaces.name = "surfaces";
	screen.scene.add(surfaces);
	animate();
}

function btnCLR_Click()
{
	var obj = screen.scene.getObjectByName("surfaces");
	screen.scene.remove(obj);
	
	cmap=[];
	// Create a color map
    for ( var i = 0; i < 256; i++ )
    {
        var S = i / 255.0; // [0,1]
        var R = Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 );
        var G = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
        var B = Math.max( Math.cos( S * Math.PI ), 0.0 );
        var color = new THREE.Color( R, G, B );
        cmap.push( [ S, '0x' + color.getHexString() ] );
    }
	
	surfaces = Isosurfaces( volume,Math.round( document.getElementById("isovalue").value*255) ,cmap);
	surfaces.name = "surfaces";
	screen.scene.add(surfaces);
	animate();
	
}
