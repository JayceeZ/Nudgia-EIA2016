/**
 * Created by alexandre on 07/06/16.
 */

// Warning : need d3.js to be working

/**
 * Props : --> id : id to give to the component
 *         --> width : container's width
 *         --> height : container's height
 *         --> margin : {top: x, right: x, bottom: x, left: x}
 *         --> treeData : [{name:root,children:[{name:sub1},{name:sub2,children:[...]}]}]
 *         --> circleColor
 *         --> linkColor
 *         --> onClick : call onSelect(node) when a node is selected
 *         --> actions : [{content:actionName1,data:data1},{content:actionName2,data:data2}, ...]
 *         --> onAction : call onAction(data) when an action is selected
 */

var diagonal = d3.svg.diagonal().projection(function(d){return [d.y,d.x]});
var d_duration = 500, d_circleColor = "steelblue", d_linkColor = "#ccc";


window.GraphTree =  React.createClass({
    getInitialState:function(){
        var tree = d3.layout.tree();
        return {id:(this.props.id ? this.props.id : "g"+generateID()),
                tree: tree, ddx:null, ddy:null
        }
    },
    getMargin:function(){
        return {top : this.props.margin && this.props.margin.top ? this.props.margin.top : 20,
            bottom : this.props.margin && this.props.margin.bottom ? this.props.margin.bottom : 20,
            left : this.props.margin && this.props.margin.left ? this.props.margin.left : 120,
            right : this.props.margin && this.props.margin.right ? this.props.margin.right : 120
        }
    },
    getCircleColor:function(){
        return this.props.circleColor ? this.props.circleColor : d_circleColor;
    },
    getLinkColor:function(){
        return this.props.linkColor ? this.props.linkColor : d_linkColor;
    },
    getTransitionDuration:function(){
        return this.props.transitionDuration ? this.props.transitionDuration : d_duration;
    },
    getWidth:function(){
        var margin = this.getMargin();
        return this.props.width - margin.left - margin.right;
    },
    getHeight:function(){
        var margin = this.getMargin();
        return this.props.height - margin.top - margin.bottom;
    },
    componentDidUpdate:function(){
        this.updateData();
        this.state.tree.size([this.getHeight(), this.getWidth()]);
        this.updateTreeLayout(this.treeData[0]);

    },
    treeData:null,
    updateData:function(){
        if(!this.treeData || (this.treeData[0] && this.props.treeData[0] && this.treeData[0].id != this.props.treeData[0].id)) {
            this.treeData = JSON.parse(JSON.stringify(this.props.treeData));
            this.treeData[0].x0 = this.getHeight() / 2;
            this.treeData[0].y0 = 0;
        }else{
            this.updateNode(this.treeData[0], this.props.treeData[0])
        }
    },
    updateNode:function(node,update){
        // Update properties
        for(var prop in update){
            if(prop != "children" && prop != "_children" && update[prop] != node[prop])
                node[prop] = update[prop];
        }
        var child,updateChild, childrenCreated = false;
        var nodeChildren = node.children;
        if(!nodeChildren) {
            if(node._children)
                nodeChildren = node._children;
            else{
                nodeChildren = [];
                childrenCreated = true;
            }
        }

        // Check for children to update or delete
        for(child in nodeChildren){
            updateChild = this.findChildren(nodeChildren[child],update.children);
            if(updateChild)
                this.updateNode(nodeChildren[child],updateChild);
            else
                nodeChildren.splice(0,child);

        }
        // Check for new children
        for(child in update.children){
            if(!this.findChildren(update.children[child],nodeChildren))
                nodeChildren.push(update.children[child])
        }
        if(childrenCreated && nodeChildren.length > 0)
            node.children = nodeChildren;
    },
    findChildren:function(node,children){
        for(var child in children)
            if(node.id == children[child].id)
                return children[child];
        return null;
    },
    hasChildren:function(node){
        return (node.children && node.children.length > 0) || (node._children && node._children.length > 0);
    },
    updateTreeLayout:function(source){
        var _this = this;
        // Compute the new tree layout.
        var nodes = this.state.tree.nodes(this.treeData[0]).reverse(),
            links = this.state.tree.links(nodes);

        var max_depth = 0;
        nodes.forEach(function(d) { if(d.depth > max_depth) max_depth = d.depth});
        var dy = max_depth > 0 ? this.getWidth() / max_depth : 0;
        // Normalize for fixed-depth.
        nodes.forEach(function(d) { d.y = d.depth * dy; });

        // Update the nodes…
        var svg = d3.select("#"+this.state.id);

        var node = svg.selectAll("g.node")
            .data(nodes, function(d) { return d.id || (d.id = generateID()); });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; });


        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill",function(d) { return d.selected ? _this.getCircleColor() : "#fff"})
            .style("stroke", this.getCircleColor())
            .style("stroke-width", "3px")
            .style("cursor","pointer")
            .on("click", this.nodeClick);

        nodeEnter.append("text")
            .attr("y", -20)
            .attr("text-anchor", "middle")
            .text(function(d) { return d.name; })
            .style("fill-opacity", 1e-6);

        // Add/remove expand/shrink icon depending on the presence of children
        node.each(function(d){
            var expand = d3.select(this).select("g.node-expand-shrink");
            if(_this.hasChildren(d) && expand.empty()) {
                d3.select(this).append("g")
                    .attr("class","node-expand-shrink")
                    .on('click',_this.nodeExpand)
                    .style("cursor","pointer")
                    .append("svg:image")
            }
            else if(!expand.empty() && !_this.hasChildren(d))
                expand.remove();
        });

        // Add action icon if selected or remove if not
        node.each(function(d){
            var actionPan = d3.select(this).select("g.node-action");
            if(d.selected && actionPan.empty()) {
                var g = d3.select(this).append("g");
                var im = g.attr("class","node-action")
                    .append("svg:image")
                    .style("cursor","pointer")
                    .on("click",function(){_this.nodeAction(d)})
            }
            else if(!actionPan.empty() && !d.selected)
                actionPan.remove();
        });

        nodeEnter.select("image")
            .attr("width",0)
            .attr("height",0);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(this.getTransitionDuration())
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

        nodeUpdate.select("circle")
            .attr("r", 10)
            .style("fill", function(d){ return d.selected ? _this.getCircleColor() : "#fff"});

        nodeUpdate.select("text")
            .style("fill-opacity", 1)
            .text(function(d) { return d.name; });

        nodeUpdate.select("g.node-expand-shrink image")
            .attr('x', 15)
            .attr('y', -10)
            .attr('width',20)
            .attr('height',20)
            .attr('xlink:href',function(d){return d._children ? "images/expandIcon.png" : "images/shrinkIcon.png"});

        nodeUpdate.select("g.node-action image")
            .attr('x', -10)
            .attr('y', 15)
            .attr('width',20)
            .attr('height',20)
            .attr('xlink:href',"images/toolsIcon.png");


        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(this.getTransitionDuration())
            .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        nodeExit.select("image")
            .attr('width',0)
            .attr('height',0);

        // Update the links…
        var link = svg.selectAll("path.link")
            .data(links, function(d) { return d.target.id; });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .style("fill","none")
            .style("stroke",this.getLinkColor())
            .style("stroke-width", "2px")
            .attr("d", function(d) {
                var o = {x: source.x0, y: source.y0};
                return diagonal({source: o, target: o});
            });

        // Transition links to their new position.
        link.transition()
            .duration(this.getTransitionDuration())
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(this.getTransitionDuration())
            .attr("d", function(d) {
                var o = {x: source.x, y: source.y};
                return diagonal({source: o, target: o});
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });

    },
    nodeClick:function(d){
        if(this.props.onClick)
            this.props.onClick(d);
    },
    nodeExpand:function(d){
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        this.updateTreeLayout(d);
    },
    nodeAction:function(node){
        d3.event.stopPropagation();
        var margin = this.getMargin();
        this.setState({ddx:node.y+margin.left-10, ddy:node.x+margin.top+5});
    },
    checkCloseDropDown:function(){
        if(this.state.ddx)
            this.setState({ddx:null,ddy:null});
    },
    onActionClick:function(data){
        this.setState({ddx:null,ddy:null});
        if(this.props.onAction)
            this.props.onAction(data);
    },
    render:function(){
        var margin = this.getMargin();
        return(
            <div class="graph-tree" style={{"position":"relative"}}>
                <svg width={this.props.width} height={this.props.height} onClick={this.checkCloseDropDown}>
                    <g id={this.state.id} transform={"translate("+margin.left+","+margin.top+")"}></g>
                </svg>
                <div style={{"position":"absolute","top":this.state.ddy,"left":this.state.ddx,"display":this.state.ddx ? "block" : "none","white-space":"nowrap"}}>
                    <Collection content={this.props.actions}
                                onClick={this.onActionClick} />
                </div>
            </div>
        )
    }
});
