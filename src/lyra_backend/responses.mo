import List "mo:base/List";
import Option "mo:base/Option";
import Trie "mo:base/Trie";
import Nat32 "mo:base/Nat32";

actor responses {

  /**
   * Types
   */

  // The type of a Input identifier.
  public type Id = Nat32;

  // The type of a Input.
  public type Input = {
    name : Text;
    request : List.List<Text>;
  };

  /**
   * Application State
   */

  // The next available Input identifier.
  private stable var next : Id = 0;

  // The Input data store.
  private stable var responses : Trie.Trie<Id, Input> = Trie.empty();

  /**
   * High-Level API
   */

  // Create an input into the database.
  public func create(Input : Input) : async Id {
    let Id = next;
    next += 1;
    responses := Trie.replace(
      responses,
      key(Id),
      Nat32.equal,
      ?Input,
    ).0;
    return Id;
  };

  // Read a Input.
  public query func read(Id : Id) : async ?Input {
    let result = Trie.find(responses, key(Id), Nat32.equal);
    return result;
  };

  // Update a Input.
  public func update(Id : Id, Input : Input) : async Bool {
    let result = Trie.find(responses, key(Id), Nat32.equal);
    let exists = Option.isSome(result);
    if (exists) {
      responses := Trie.replace(
        responses,
        key(Id),
        Nat32.equal,
        ?Input,
      ).0;
    };
    return exists;
  };

  // Delete a Input.
  public func delete(Id : Id) : async Bool {
    let result = Trie.find(responses, key(Id), Nat32.equal);
    let exists = Option.isSome(result);
    if (exists) {
      responses := Trie.replace(
        responses,
        key(Id),
        Nat32.equal,
        null,
      ).0;
    };
    return exists;
  };

  /**
   * Utilities
   */

  // Create a trie key from a Input identifier.
  private func key(x : Id) : Trie.Key<Id> {
    return { hash = x; key = x };
  };
};