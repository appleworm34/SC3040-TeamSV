import Swap from "../models/Swap.js"
import {swapIndex} from "../controllers/user.js"
import User from '../models/User.js'
import Course from "../models/Course.js"

export const getSwaps = async(req,res)=>{
    try{
        const course = await Swap.find();
        res.status(200).json(course);
    }catch(error){
        res.status(409).json({ message: error.message });
    }
}

export const deleteAllSwaps = async (req, res) => {
    try {
      // Delete all swap records in the database
      await Swap.deleteMany({});
      res.status(200).json({ message: 'All swap records deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

const findMatch = async (courseList,courseCode) => {
    // CONCEPT: use graph to simplify matching problem, nodes represent indexes, directed edge comes from current index to desired index, if there is a cycle in the constructed graph, then there is a matching set which can be swapped
    // each edge will take its desired(the pointed) and remove the edges associated with the userids

    // filter courseList to only those in this courseCode
    const filteredList = courseList.filter(dic=>dic.courseCode==courseCode);
    // run findcycle
    class DiGraph {
        constructor(vertices) {
          this.vertices = vertices;
          this.adjList = new Map();
        }
      
        addEdge(vertex1, vertex2, userId) {
          if (!this.adjList.has(vertex1)) this.adjList.set(vertex1, []);
          if (!this.adjList.has(vertex2)) this.adjList.set(vertex2, []);
      
          this.adjList.get(vertex1).push({ vertex: vertex2, userId: userId });
        }
      
        findCycle() {
          const visited = new Set();
          const stack = new Set();
          const cycleEdges = [];
      
          for (const vertex of this.adjList.keys()) {
            if (!visited.has(vertex) && this.isCyclic(vertex, visited, stack, cycleEdges)) {
              return cycleEdges; // Return the edges involved in the cycle
            }
          }
      
          return null; // No cycle found
        }
      
        isCyclic(vertex, visited, stack, cycleEdges) {
          visited.add(vertex);
          stack.add(vertex);
      
          for (const edgeData of this.adjList.get(vertex)) {
            const neighbor = edgeData.vertex;
            if (!visited.has(neighbor)) {
              if (this.isCyclic(neighbor, visited, stack, cycleEdges)) {
                // Cycle detected, add the edge to the cycleEdges
                cycleEdges.push({ vertex1: vertex, vertex2: neighbor, userId: edgeData.userId });
                return true;
              }
            } else if (stack.has(neighbor)) {
              // Cycle detected, add the edge to the cycleEdges
              cycleEdges.push({ vertex1: vertex, vertex2: neighbor, userId: edgeData.userId });
              return true;
            }
          }
      
          stack.delete(vertex);
          return false;
        }
      }
      
      // Example usage
      const graph = new DiGraph(filteredList.length);
      filteredList.map((dic)=>{
        dic.desiredIndex.map((d_index)=>{
            graph.addEdge(dic.currentIndex,d_index,dic._id)
        })
      })
    //   graph.addEdge(1, 2, 'user1');
    //   graph.addEdge(2, 3, 'user2');
    //   graph.addEdge(3, 4, 'user3');
    //   graph.addEdge(4, 5, 'user4');
    //   graph.addEdge(5, 1, 'user5'); // Creates a directed cycle
      let pass = false
      const cycleEdges = graph.findCycle();
      if (cycleEdges) {
        console.log('Cycle detected in the directed graph. Edges involved in the cycle:');
        for (const { vertex1, vertex2, swapId } of cycleEdges) {
            // go to each swapid and perform the swap
            // remove this swap entry
            let removed = await Swap.findByIdAndRemove(swapId)
            let courseCode = removed.courseCode
            await swapIndex(removed.userId,courseCode,vertex2)
          console.log(`${vertex1} -> ${vertex2} (swap_id: ${swapId})`);
          pass=vertex1
        }
        
      } else {
        console.log('No cycle found in the directed graph.');
      }
      return pass
}

export const addSwap = async (req, res) => {
  try {
    const { userId,courseCode,currentIndex,desiredIndex } = req.body;
    console.log(currentIndex,desiredIndex)
    // check if swap already exist
    const course = await Swap.find();
    let existingSwap = course.filter((swap)=>swap.userId==userId && swap.courseCode==courseCode)
    if (existingSwap){
      existingSwap = existingSwap[0]
      // console.log([new Set([...existingSwap.desiredIndex,...desiredIndex])])
      existingSwap.desiredIndex = [...new Set([...existingSwap.desiredIndex,...desiredIndex])]
      console.log(existingSwap.desiredIndex)
      await Swap.updateOne(
        {_id:existingSwap._id},
        {desiredIndex: existingSwap.desiredIndex}
        )
      
      console.log(existingSwap)
    }
    else{
      // create new swap
      const newSwap = new Swap({
          userId:userId,
          courseCode:courseCode,
          currentIndex:currentIndex,
          desiredIndex:desiredIndex
      });
      
      await newSwap.save();
    }
    

    
    
    // // add into user.moduledesiredindex
    // const user = await User.findById(userId);
    // let courses = await Course.find();
    // let courseId=courses.filter((course)=>course.courseCode===courseCode)[0]._id
    // // user.modulesCurrentIndex.push([courseId,courseCode,currentIndex])
    // user.modulesDesiredIndex=[]
    // await user.save()
    let pass = await findMatch(course,courseCode)
    if (pass){
      // change current user index
      const user = await User.findById(newSwap.userId)
      // user.modulesCurrentIndex = user.modulesCurrentIndex.map(module => {
      //   if (module.courseCode==courseCode){
      //     module.index=pass
      //   }
      //   return module
      // })
      // try{
      //   console.log("swap")
      //   console.log(pass)
      //   await user.save();
      //   console.log(user)
      // }catch(e){
      //   console.log(e)
      // }
      
    }
    // res.status(201).json({swap:pass});
    res.status(200).json({swap:pass})
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
}
