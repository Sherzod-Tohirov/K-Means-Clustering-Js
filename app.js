points = [[2,4,6], [0,8,7], [5,4,3], [5,4,3], [7,2,5], [1,7,8]];

function k_means_clustering(points, no_of_clusters = 2, dimensions = 3) {
    // Validate given arguments
    if(points?.length == 0) {
        console.log("Provided points are not valid !");
        return;
    }

    if(no_of_clusters <= 0) {
        console.log("Invalid number of clusters !");
        return;
    }

    if(dimensions < 1) {
        console.log("Invalid number of dimensions !");
        return;
    }

    // Additional functions 

    function getInitialPoints(points, number_of_groups) {
        const arr = [];
        for(let i = 0; i < number_of_groups; i++) {
            arr.push(points[Math.floor(Math.random() * points.length)]);
        }

        return arr;
    }

    function calc_euclidean_distance(point1, point2, dimension_number) {
        let calculated_points = []; 
        for(let i = 0; i < dimension_number; i++) {
            calculated_points.push(Math.pow(Math.abs(point2[i] - point1[i]), 2));
        }
        return Math.sqrt(calculated_points.reduce((total, item) => total += item, 0));
    }
    
    // Start of calculation 
    

    const clusters = [];
    const initial_points_arr = getInitialPoints(points, no_of_clusters);
    const euclidean_distance_calc_arr = [];
    const objs_of_points = [];

    // Calculate Euclidean distance with random taken initial points 

    for (const point of initial_points_arr) {
        euclidean_distance_calc_arr.push(points.map(item => {
            return calc_euclidean_distance(point, item, dimensions).toFixed(2);
          }));
    }
    
    // Calculate minimum distance for clustering 

    for(let i = 0; i < points.length; i++) {
        let new_arr = [];
        for (const arr of euclidean_distance_calc_arr) {
            new_arr.push(arr[i]);
        }
        new_arr = new_arr.map(item => item.replace('.00', ''));
    
        const min_value = Math.min(...new_arr);
        const index_of_min_value = new_arr.indexOf(`${min_value}`);
        objs_of_points.push({
            value: min_value,
            points: points[i], 
            cluster: index_of_min_value
        });

    }

    // Calculate centroids for k clusters

    const clustered_arr = [];
    
    for(const item of objs_of_points) {
 
            const hasCluster = clustered_arr.find(arr_item => {
                return arr_item.cluster === item.cluster;
            });

            if(hasCluster) {
                hasCluster.points.push(item.points);
            }else {
                clustered_arr.push({
                    cluster: item.cluster,
                    points: [item.points]
                });
            }
        
    }

    for(obj of clustered_arr) {
        let arr = [];
        for(let i = 0; i < dimensions; i++) {
            let sum = 0;
            for(let j = 0; j < obj.points.length; j++) {
                 sum += obj.points[j][i];
            }
            sum /= dimensions;
            arr.push(sum.toFixed(2));
        }

        clusters.push(arr);
    }

    if(clusters.length < no_of_clusters) {
        while(clusters.length != no_of_clusters) {
            clusters.push([]);
        }
    }
    
    return clusters;
}


let result = k_means_clustering(points);

console.log("Clusters");
console.log(result);