import { IMerkleTree, Tree } from "./merkleTree.interface";
import { PreciseProofs } from "ew-precise-proofs-js";

export class MerkleTree implements IMerkleTree {
  tree: Tree;

  createLeaves(document: any): PreciseProofs.Leaf[] {
    const leaves = PreciseProofs.createLeafs(document);
    return leaves;
  }
  createTree(leaves: PreciseProofs.Leaf[]): any[] {
    const merkleTree = PreciseProofs.createMerkleTree(
      leaves.map((leaf: PreciseProofs.Leaf) => leaf.hash)
    );
    return merkleTree;
  }

  createRoot(leaves: PreciseProofs.Leaf[], merkleTree: any[]): string {
    const rootHash = PreciseProofs.getRootHash(merkleTree);
    const schema = leaves.map((leaf: PreciseProofs.Leaf) => leaf.key);
    const extendedTreeRootHash = PreciseProofs.createExtendedTreeRootHash(
      rootHash,
      schema
    );
    return extendedTreeRootHash;
  }

  getRoot(document: any): string {
    const leaves = this.createLeaves(document);
    const merkleTree = this.createTree(leaves);
    const root = this.createRoot(leaves, merkleTree);
    return root;
  }
}
