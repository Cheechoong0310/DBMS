import matplotlib.pyplot as plt
import pandas as pd

# ==========================================
# 1. GENERATE FIGURE 2 (Latency Line Chart)
# ==========================================
def generate_figure_2():
    # Data derived from the "Performance Overhead" section of the report
    data = {
        'Data Volume': ['10 MB', '100 MB', '500 MB', '1 GB', '2 GB'],
        'Traditional RDBMS': [12, 15, 22, 45, 68],  # Low, linear latency
        'Permissioned Blockchain': [150, 185, 310, 550, 890], # Moderate overhead
        'Public Blockchain': [450, 820, 1400, 2800, 5600] # Exponential scaling
    }
    
    df = pd.DataFrame(data)
    
    plt.figure(figsize=(10, 6))
    plt.plot(df['Data Volume'], df['Traditional RDBMS'], marker='o', label='Traditional RDBMS (Baseline)', linewidth=2, color='#2980b9')
    plt.plot(df['Data Volume'], df['Permissioned Blockchain'], marker='s', label='Permissioned Blockchain (Proposed)', linewidth=2, color='#27ae60')
    plt.plot(df['Data Volume'], df['Public Blockchain'], marker='^', linestyle='--', label='Public Blockchain (Comparison)', color='gray')
    
    plt.title('Figure 2: Impact of Data Volume on Write Latency', fontsize=14)
    plt.ylabel('Write Latency (ms) - Log Scale', fontsize=12)
    plt.xlabel('Dataset Volume', fontsize=12)
    plt.yscale('log') # Log scale is crucial to show the massive difference clearly
    plt.grid(True, which="both", ls="-", alpha=0.5)
    plt.legend()
    
    filename = 'Figure_2_Latency_Analysis.png'
    plt.savefig(filename, dpi=300)
    print(f"✅ Generated: {filename}")
    plt.close()

# ==========================================
# 2. GENERATE FIGURE 11 (Verification Speed Bar Chart)
# ==========================================
def generate_figure_11():
    # Data derived from "Forensic Verification" section
    categories = ['Manual SQL Audit', 'Automated Blockchain Verify']
    values = [120, 3757] # MB/s throughput
    
    plt.figure(figsize=(8, 6))
    bars = plt.bar(categories, values, color=['#e74c3c', '#27ae60'], width=0.5)
    
    plt.title('Figure 11: Forensic Verification Throughput (Speed)', fontsize=14)
    plt.ylabel('Throughput (MB/s)', fontsize=12)
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    
    # Add text labels on top of bars for clarity
    for bar in bars:
        yval = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2, yval + 50, f"{yval} MB/s", ha='center', va='bottom', fontsize=11, fontweight='bold')
        
    filename = 'Figure_11_Verification_Speed.png'
    plt.savefig(filename, dpi=300)
    print(f"✅ Generated: {filename}")
    plt.close()

if __name__ == "__main__":
    generate_figure_2()
    generate_figure_11()