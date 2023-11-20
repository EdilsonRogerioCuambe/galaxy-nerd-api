# Função para implementar o algoritmo de Bellman Ford
def BellmanFord(graph, V, E, src):

    # Inicializar distância de todos os vértices como infinito.
    dis = [float("Inf")] * V

    # Inicializar a distância da fonte como 0
    dis[src] = 0

    # Atualizar o valor da distância seguindo o algoritmo de Bellman Ford
    for i in range(V - 1):
        for j in range(E):
            if dis[graph[j][0]] != float("Inf") and dis[graph[j][0]] + graph[j][2] < dis[graph[j][1]]:
                dis[graph[j][1]] = dis[graph[j][0]] + graph[j][2]

    # Verificar ciclos negativos nos vértices adjacentes ao vértice fonte
    for i in range(E):
        x = graph[i][0]
        y = graph[i][1]
        weight = graph[i][2]
        if dis[x] != float("Inf") and dis[x] + weight < dis[y]:
            print("O grafo contem ciclo de peso negativo")

    # Imprimir todas as distâncias
    print("Distancias dos vertices em relacao a fonte:")
    for i in range(V):
        print(f"{i}\t\t{dis[i]}")

# Testando o código
if __name__ == "__main__":
    V = 5  # Número total de vértices no grafo
    E = 8  # Número total de arestas no grafo

    # Cada aresta tem três valores (u, v, w) onde a aresta é do vértice u para v. E o peso da aresta é w.
    graph = [[0, 1, -1], [0, 2, 4], [1, 2, 3], [1, 3, 2], [1, 4, 2], [3, 2, 5], [3, 1, 1], [4, 3, -3]]

    BellmanFord(graph, V, E, 0)
