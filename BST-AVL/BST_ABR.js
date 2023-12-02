function Node(val = null) {
	this.value = val;
	this.parent = null;
	
	this.left = null;
	this.right = null;
	this.json = {
		name: this.value,
		direction: null,
		children: []
	};

	
}

function BST() {
	this.root = null;

		// Returns the node that contains val
	this.Search = function(val, cur = this.root) {
		if (cur == null)
			return -1;

		if (cur.value == val)
			return cur;
		if (val > cur.value)
			return this.Search(val, cur.right);
		return this.Search(val, cur.left);
	}

    this.Insert = function(cur, val) {
        if (cur === null) {
            return new Node(val);
        }
    
        if (val < cur.value) {
            cur.left = this.Insert(cur.left, val);
            if (cur.left && cur.left.parent === null) {
                cur.left.parent = cur;
                // Update JSON for visualization
                cur.json.direction = 'left';
                cur.json.children.push(cur.left.json);
            }
        } else if (val > cur.value) {
            cur.right = this.Insert(cur.right, val);
            if (cur.right && cur.right.parent === null) {
                cur.right.parent = cur;
                // Update JSON for visualization
                cur.json.direction = 'right';
                cur.json.children.push(cur.right.json);
            }
        }
    
        return cur;
    }
    
    this.InsertVal = function(val) {
        if (this.Search(val)) {
            // Value already exists in the tree, do not insert duplicates
            return;
        }
        this.root = this.Insert(this.root, val);
    }
    
    
    
    

	this.InsertVal = function(val) {
		this.root = this.Insert(this.root, val);
	}

	this.DeleteVal = function(val) {
		var node = this.Search(val);
		if (node == -1)
			return;

		this.Delete(node);

		// If the tree is not empty
    }

	this.Delete = function(cur) ///we will give it the pointer node we want to delete it , not the value , and after deleting we will call balance function given the cur
	{
		// If it is the only node in the tree
		if (cur.parent == null && cur.right == null && cur.left == null) {
			// Clear the tree
			this.root = null;
			return;
		}

		if (cur.right == null) {
			// If it's the root node
			if (cur.parent == null) {
				cur = cur.left;
				cur.parent = null;
			}

			else if (cur.parent.left == cur)
				cur.parent.left = cur.left;
			else
				cur.parent.right = cur.left;
			if (cur.left)
				cur.left.parent = cur.parent;

		} else if (cur.left == null) {
			// If it's the root node
			if (cur.parent == null) {
				cur = cur.right;
				cur.parent = null;
			}

			else if (cur.parent.left == cur)
				cur.parent.left = cur.right;
			else
				cur.parent.right = cur.right;
			if (cur.right)
				cur.right.parent = cur.parent;

		} else {
		var prev, temp = cur;
			temp = cur.left;
			prev = cur;
			while (temp.right != null) {
				prev = temp;
				temp = temp.right;
			}
			cur.value = temp.value;
			cur.json.name = cur.value;
			if (prev == cur)
				prev.left = temp.left;
			
			
			return;
		}

    }

	this.inorder = function(cur = this.root) {
		var numbers = [];
		if (cur != null) {
			numbers = this.inorder(cur.left);
			numbers.push(cur.value);
			numbers = numbers.concat(this.inorder(cur.right));
		}
		return numbers;
	}

	this.preorder = function(cur = this.root) {
		var numbers = [];
		if (cur != null) {
			numbers = [cur.value];
			numbers = numbers.concat(this.preorder(cur.left));
			numbers = numbers.concat(this.preorder(cur.right));
		}
		return numbers;
	}

	this.postorder = function(cur = this.root) {
		var numbers = [];
		if (cur != null) {
			numbers = numbers.concat(this.postorder(cur.left));
			numbers = numbers.concat(this.postorder(cur.right));
			numbers.push(cur.value);
		}
		return numbers;
	}
}

var bst = new BST();