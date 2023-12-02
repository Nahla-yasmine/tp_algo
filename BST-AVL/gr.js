var textBox = document.getElementById('value');
var msg = document.getElementById('msg');

function InsertNode() {
	var val = Number(textBox.value || getRandomInt(0, 1000));
	bst.InsertVal(val);
	textBox.value = '';
	msg.innerHTML = '';
	textBox.focus();
	drawTree();
}

function DeleteNode() {
	if (textBox.value != '') {
		var val = Number(textBox.value);
		bst.DeleteVal(val);
		textBox.value = '';
		drawTree();
	}
	msg.innerHTML = '';
	textBox.focus();
}

function SearchNode() {
	if (textBox.value != '') {
		var val = Number(textBox.value);
		var node = bst.Search(val);
		if (node == -1)
			msg.innerHTML = 'not found';
		else
			msg.innerHTML = 'found';
	}
	textBox.value = '';
	textBox.focus();
}

// traversal is a function
function Print(traversal) {
	var numbers = traversal.call(bst);
	msg.innerHTML = numbers.join(', ');
	textBox.focus();
}

function handleKeyPress(e) {
	var key = e.keyCode || e.which;
	msg.innerHTML = '';
	if (key == 13)
		InsertNode();
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// Draws the tree in treeData
// Draws the tree in treeData
// Modify the drawTree function to draw a Binary Search Tree (BST)
function drawTree(rootNode) {
    // Clear the canvas
    d3.select("svg").remove();

    // If the tree is empty, exit
    if (!rootNode) return;

    // set the dimensions and margins of the diagram
    var margin = {
            top: 40,
            right: 90,
            bottom: 50,
            left: 90
        },
        width = window.innerWidth - 10 - margin.left - margin.right,
        height = window.innerHeight - 45 - margin.top - margin.bottom;

    // declares a tree layout and assigns the size
    var treemap = d3.tree()
        .size([width, height]);

    // assigns the data to a hierarchy using parent-child relationships
    var nodes = d3.hierarchy(rootNode);

    // maps the node data to the tree layout
    nodes = treemap(nodes);

    // append the svg object to the body of the page
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom),
        g = svg.append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // adds the links between the nodes
    var link = g.selectAll(".link")
        .data(nodes.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .attr("d", function(d) {
            return "M" + d.x + "," + d.y +
                "C" + (d.x + d.parent.x) / 2 + "," + (d.y + d.parent.y) / 2 +
                " " + (d.x + d.parent.x) / 2 + "," + (d.y + d.parent.y) / 2 +
                " " + d.parent.x + "," + d.parent.y;
        });

    // adds each node as a group
    var node = g.selectAll(".node")
        .data(nodes.descendants())
        .enter().append("g")
        .attr("class", function(d) {
            return "node" +
                (d.children ? " node--internal" : " node--leaf");
        })
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    // adds the circle to the node
    node.append("circle")
        .attr("r", 15);

    // adds the text to the node
    node.append("text")
        .attr("dy", ".35em")
        .attr("y", function(d) {
            return 0;
        })
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.key; // Use node's key value for text
        });
}
