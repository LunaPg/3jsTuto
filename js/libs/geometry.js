function interpolateUV(va, vb, vc, vn, uva, uvb, uvc)
{
	// calculate vectors from new vertex to triangle vertices
	var vec1 = new THREE.Vector3().subVectors( va, vn );
	var vec2 = new THREE.Vector3().subVectors( vb, vn );
	var vec3 = new THREE.Vector3().subVectors( vc, vn );
	
	// calculate triangle areas, barycentric coordinates
	var denom = ( new THREE.Vector3().crossVectors( 
				  new THREE.Vector3().subVectors( vec1, vec2 ),
				  new THREE.Vector3().subVectors( vec1, vec3 ) ) 
				).length();
	var bary1 = ( new THREE.Vector3().crossVectors(vec2, vec3) ).length() / denom; 
	var bary2 = ( new THREE.Vector3().crossVectors(vec3, vec1) ).length() / denom; 
	var bary3 = ( new THREE.Vector3().crossVectors(vec1, vec2) ).length() / denom; 
	
	// interpolate UV coordinates for new vertex
	var uvn = new THREE.Vector3().addVectors( uva.clone().multiplyScalar(bary1), uvb.clone().multiplyScalar(bary2) ).add( uvc.clone().multiplyScalar(bary3) ); 
	return uvn;
}

