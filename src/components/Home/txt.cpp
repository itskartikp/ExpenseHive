#include <bits/stdc++.h>
using namespace std;

const int maxx = 1e5;
vector<int> tree[maxx];
int degree_of_node[maxx], parent_of_node[maxx],
    child_of_node[maxx], flag = -1;
    
    
void dfs(int current, int parent)
{
    parent_of_node[current] = parent;
    for (int& child : tree[current]) {
 
        
        if (child == parent)
            return;
        dfs(child, current);
    }
 
    if (degree_of_node[current] == 1 && current != 1) {
 
        child_of_node[current] = 0;
        return;
    }
 
    int total_child = 0;
    for (auto& child : tree[current]) {
        if (child == parent)
            return;
        else
            ++total_child;
    }
    child_of_node[current] = total_child;
    return;
}

int find_nPr(int N, int R)
{
    if (R > N) {
        flag = 0;
        return 0;
    }
    int total = 1;
    for (int i = N - R + 1; i <= N; ++i) {
        total = total * i;
    }
    return total;
}

int NoOfWays(int Nodes, int colors)
{
 
    // Do dfs to find parent and child of a node,
    // we root the tree at node 1.
    dfs(1, -1);
 
    // Now start iterating for all nodes of
    // the tree and count the number of ways to
    // paint its children and node itself
    int ways = 0;
    for (int i = 1; i <= Nodes; ++i) {
 
        // If the current node is root node, then
        // we have total of K ways to paint it and
        // (k-1)P(x) to paint its child
        if (i == 1) {
            ways = ways + colors *
                   find_nPr(colors - 1, child_of_node[1]);
        }
        else {
 
            // For other remaining nodes which are not
            // leaf nodes we have (k-2)P(x) to paint
            // its children, we will not take into
            // consideration of current node
            // since we already painted it.
            if (degree_of_node[i] == 1) {
                continue;
            }
            else {
                ways = ways *
                find_nPr(colors - 2, child_of_node[i]);
            }
        }
    }
    return ways;
}


int main() {
	// your code goes here
	int n,c;
	cin>>n>>c;
	int u,v;
	
	for(int i=0; i<n-1; i++)
	{
	    cin>>u>>v;
	    tree[u].push_back(v);
	    degree_of_node[u]++;
	}
	
	cout<<NoOfWays(n,c)<<endl;
	
	
	
	return 0;
}