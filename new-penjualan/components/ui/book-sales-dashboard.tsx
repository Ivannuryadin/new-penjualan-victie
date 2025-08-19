"use client";

import { useState, useEffect } from "react";
import React from "react"; // Import React for React.Fragment
import {
  Calendar,
  Search,
  Bell,
  Moon,
  User,
  BarChart3,
  FileText,
  PieChart,
  BookOpen,
  Users,
  Gift,
  Coins,
  CreditCard,
  UserCheck,
  Receipt,
  ChevronDown,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Eye,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  X,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialSalesData = [
  {
    id: "601589",
    buyerName: "405899-guest",
    amount: 25000,
    chapterTitle: "Perasaan Anissa",
    purchaseDate: "8/19/2025",
    status: "completed",
    details: {
      paymentMethod: "Credit Card",
      transactionTime: "14:30",
      deviceType: "Mobile",
      location: "Jakarta, Indonesia",
    },
  },
  {
    id: "600637",
    buyerName: "xv6go3polo",
    amount: 15000,
    chapterTitle: "Pengakuan Azka ke Indira",
    purchaseDate: "8/18/2025",
    status: "completed",
    details: {
      paymentMethod: "E-Wallet",
      transactionTime: "09:15",
      deviceType: "Desktop",
      location: "Bandung, Indonesia",
    },
  },
  {
    id: "584074",
    buyerName: "395263-guest",
    amount: 20000,
    chapterTitle: "Azka dan Indira",
    purchaseDate: "8/15/2025",
    status: "pending",
    details: {
      paymentMethod: "Bank Transfer",
      transactionTime: "16:45",
      deviceType: "Mobile",
      location: "Surabaya, Indonesia",
    },
  },
  {
    id: "583558",
    buyerName: "394967-guest",
    amount: 18000,
    chapterTitle: "Pengakuan Azka ke Indira",
    purchaseDate: "8/15/2025",
    status: "completed",
    details: {
      paymentMethod: "Credit Card",
      transactionTime: "11:20",
      deviceType: "Tablet",
      location: "Medan, Indonesia",
    },
  },
  {
    id: "583550",
    buyerName: "394967-guest",
    amount: 22000,
    chapterTitle: "Azka dan Indira",
    purchaseDate: "8/15/2025",
    status: "completed",
    details: {
      paymentMethod: "E-Wallet",
      transactionTime: "13:10",
      deviceType: "Mobile",
      location: "Yogyakarta, Indonesia",
    },
  },
  {
    id: "581093",
    buyerName: "393234-guest",
    amount: 30000,
    chapterTitle: "Azka dan Indira",
    purchaseDate: "8/14/2025",
    status: "completed",
    details: {
      paymentMethod: "Credit Card",
      transactionTime: "10:30",
      deviceType: "Desktop",
      location: "Semarang, Indonesia",
    },
  },
  {
    id: "575399",
    buyerName: "xv6go3polo",
    amount: 16000,
    chapterTitle: "Azka dan Indira",
    purchaseDate: "8/13/2025",
    status: "completed",
    details: {
      paymentMethod: "Bank Transfer",
      transactionTime: "15:45",
      deviceType: "Mobile",
      location: "Malang, Indonesia",
    },
  },
  {
    id: "519624",
    buyerName: "352407-guest",
    amount: 28000,
    chapterTitle: "Azka dan Indira",
    purchaseDate: "8/2/2025",
    status: "completed",
    details: {
      paymentMethod: "E-Wallet",
      transactionTime: "12:15",
      deviceType: "Desktop",
      location: "Denpasar, Indonesia",
    },
  },
  {
    id: "519175",
    buyerName: "351776-guest",
    amount: 19000,
    chapterTitle: "Anissa dan Indira",
    purchaseDate: "8/2/2025",
    status: "completed",
    details: {
      paymentMethod: "Credit Card",
      transactionTime: "17:20",
      deviceType: "Mobile",
      location: "Makassar, Indonesia",
    },
  },
  {
    id: "462869",
    buyerName: "230722-guest",
    amount: 35000,
    chapterTitle: "Perasaan Anissa",
    purchaseDate: "7/17/2025",
    status: "completed",
    details: {
      paymentMethod: "Bank Transfer",
      transactionTime: "08:45",
      deviceType: "Desktop",
      location: "Palembang, Indonesia",
    },
  },
];

const initialSidebarItems = [
  { name: "Dashboard", icon: BarChart3, active: false },
  { name: "Submissions", icon: FileText, active: false },
  { name: "Reports", icon: PieChart, active: false },
  { name: "Novels", icon: BookOpen, active: false },
  { name: "Users", icon: Users, active: false },
  { name: "Promotions", icon: Gift, active: false },
  { name: "Coins", icon: Coins, active: false },
  { name: "Withdrawals", icon: CreditCard, active: false },
  { name: "Authors", icon: UserCheck, active: false },
  { name: "Sub Account", icon: User, active: false },
  { name: "Transactions", icon: Receipt, active: true },
];

function BookSalesDashboard() {
  const [salesData, setSalesData] = useState(initialSalesData);
  const [sidebarItems, setSidebarItems] = useState(initialSidebarItems);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [completedTransactions, setCompletedTransactions] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [mostPopularChapter, setMostPopularChapter] = useState<{
    title: string;
    count: number;
  } | null>(null);

  useEffect(() => {
    // Calculate all metrics from sales data
    const revenue = salesData.reduce((sum, sale) => sum + sale.amount, 0);
    const total = salesData.length;
    const completed = salesData.filter(
      (sale) => sale.status === "completed"
    ).length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    setTotalRevenue(revenue);
    setTotalTransactions(total);
    setCompletedTransactions(completed);
    setSuccessRate(rate);

    // Calculate most popular chapter
    const chapterCounts: { [key: string]: number } = {};
    salesData.forEach((sale) => {
      chapterCounts[sale.chapterTitle] =
        (chapterCounts[sale.chapterTitle] || 0) + 1;
    });

    const sortedChapters = Object.entries(chapterCounts).sort(
      ([, a], [, b]) => b - a
    );
    if (sortedChapters.length > 0) {
      const [title, count] = sortedChapters[0];
      setMostPopularChapter({ title, count });
    }
  }, [salesData]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredAndSortedData = salesData
    .filter((sale) => {
      const matchesSearch =
        sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.chapterTitle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || sale.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (!sortField) return 0;

      let aValue: any = a[sortField as keyof typeof a];
      let bValue: any = b[sortField as keyof typeof b];

      if (sortField === "amount") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const toggleRowExpansion = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
            Selesai
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            Pending
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30">
            Unknown
          </span>
        );
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-muted-foreground" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-4 h-4 text-accent" />
    ) : (
      <ArrowDown className="w-4 h-4 text-accent" />
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation - Enhanced responsive design */}
      <div className="border-b border-border bg-background">
        <div className="flex items-center justify-between px-2 xs:px-3 sm:px-4 lg:px-6 xl:px-8 py-2 xs:py-3 sm:py-4">
          <div className="flex items-center gap-1 xs:gap-2 sm:gap-4 lg:gap-8">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-foreground p-1 xs:p-1.5 sm:p-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
            </Button>
            <div className="text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold font-serif text-accent">
              Victie
            </div>
            <nav className="hidden lg:flex items-center gap-3 xl:gap-4 2xl:gap-6">
              <a
                href="#"
                className="text-xs xl:text-sm 2xl:text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-xs xl:text-sm 2xl:text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ
              </a>
              <div className="flex items-center gap-1 text-xs xl:text-sm 2xl:text-base text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <span>Genre</span>
                <ChevronDown className="w-2 h-2 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4" />
              </div>
              <a
                href="#"
                className="text-xs xl:text-sm 2xl:text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                Keuntungan
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-0.5 xs:gap-1 sm:gap-2 lg:gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-1.5 xl:left-2 2xl:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-2.5 h-2.5 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4" />
              <Input
                placeholder="Cari buku / author"
                className="pl-6 xl:pl-8 2xl:pl-10 bg-input border-border text-foreground placeholder-muted-foreground w-24 md:w-32 lg:w-40 xl:w-48 2xl:w-64 text-xs lg:text-sm"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-muted-foreground hover:text-foreground p-0.5 xs:p-1 sm:p-2"
            >
              <Search className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground p-0.5 xs:p-1 sm:p-2"
            >
              <Moon className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground p-0.5 xs:p-1 sm:p-2"
            >
              <Bell className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground p-0.5 xs:p-1 sm:p-2"
            >
              <User className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Enhanced responsive design */}
        <div
          className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 
          w-48 xs:w-52 sm:w-56 md:w-60 lg:w-64 xl:w-72 2xl:w-80 bg-sidebar border-r border-sidebar-border min-h-screen 
          transition-transform duration-300 ease-in-out
        `}
        >
          <div className="p-2 xs:p-3 sm:p-4 lg:p-6 xl:p-8">
            <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-6">
              <h2 className="text-sm xs:text-base sm:text-lg xl:text-xl 2xl:text-2xl font-medium text-sidebar-foreground">
                Pusat Admin
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-sidebar-foreground p-0.5 xs:p-1"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
            <nav className="space-y-0.5 xs:space-y-1 sm:space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className={`flex items-center gap-1.5 xs:gap-2 sm:gap-3 px-1.5 xs:px-2 sm:px-3 xl:px-4 py-1.5 xs:py-2 sm:py-3 rounded-lg cursor-pointer transition-colors ${
                      item.active
                        ? "bg-pink-500 text-white"
                        : "text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="text-xs xs:text-sm lg:text-base xl:text-lg 2xl:text-xl">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content - Enhanced responsive design */}
        <div className="flex-1 p-2 xs:p-3 sm:p-4 lg:p-6 xl:p-8 2xl:p-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4 sm:mb-6 lg:mb-8">
            <h1 className="text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold font-serif text-foreground leading-tight">
              Penjualan Buku Cinta Sang Indigo
            </h1>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-border text-accent hover:bg-accent/10 w-fit text-xs xs:text-sm"
            >
              <Calendar className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 mr-1 xs:mr-1.5 sm:mr-2" />
              Pilih Tanggal
            </Button>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 lg:gap-4 xl:gap-6 2xl:gap-8 mb-3 xs:mb-4 sm:mb-6 lg:mb-8">
            <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 xs:pb-2 sm:pb-3">
                <CardTitle className="text-xs xs:text-sm lg:text-base xl:text-lg font-medium text-card-foreground leading-tight">
                  Total Pendapatan
                </CardTitle>
                <div className="p-1 xs:p-1.5 sm:p-2 rounded-full bg-accent/10">
                  <DollarSign className="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-accent" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-primary font-serif mb-0.5 xs:mb-1">
                  {formatAmount(totalRevenue)}
                </div>
                <p className="text-xs xs:text-xs lg:text-sm xl:text-base text-muted-foreground flex items-center">
                  <TrendingUp className="inline w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 mr-0.5 xs:mr-1 text-green-500" />
                  +12% dari bulan lalu
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 xs:pb-2 sm:pb-3">
                <CardTitle className="text-xs xs:text-sm lg:text-base xl:text-lg font-medium text-card-foreground leading-tight">
                  Total Transaksi
                </CardTitle>
                <div className="p-1 xs:p-1.5 sm:p-2 rounded-full bg-accent/10">
                  <ShoppingCart className="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-accent" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-primary font-serif mb-0.5 xs:mb-1">
                  {totalTransactions}
                </div>
                <p className="text-xs xs:text-xs lg:text-sm xl:text-base text-muted-foreground flex items-center">
                  <TrendingUp className="inline w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 mr-0.5 xs:mr-1 text-green-500" />
                  +8% dari bulan lalu
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 xs:pb-2 sm:pb-3">
                <CardTitle className="text-xs xs:text-sm lg:text-base xl:text-lg font-medium text-card-foreground leading-tight">
                  Tingkat Keberhasilan
                </CardTitle>
                <div className="p-1 xs:p-1.5 sm:p-2 rounded-full bg-accent/10">
                  <BarChart3 className="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-accent" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-primary font-serif mb-0.5 xs:mb-1">
                  {successRate}%
                </div>
                <p className="text-xs xs:text-xs lg:text-sm xl:text-base text-muted-foreground flex items-center">
                  <TrendingUp className="inline w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 mr-0.5 xs:mr-1 text-green-500" />
                  +2% dari bulan lalu
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 xs:pb-2 sm:pb-3">
                <CardTitle className="text-xs xs:text-sm lg:text-base xl:text-lg font-medium text-card-foreground leading-tight">
                  Chapter Terpopuler
                </CardTitle>
                <div className="p-1 xs:p-1.5 sm:p-2 rounded-full bg-accent/10">
                  <Eye className="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-accent" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-primary font-serif mb-0.5 xs:mb-1 leading-tight">
                  {mostPopularChapter?.title || "Tidak ada data"}
                </div>
                <p className="text-xs xs:text-xs lg:text-sm xl:text-base text-muted-foreground">
                  {mostPopularChapter?.count || 0} pembelian bulan ini
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 xs:gap-3 sm:gap-4">
                <CardTitle className="text-sm xs:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-serif text-card-foreground">
                  Riwayat Transaksi
                </CardTitle>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 xs:gap-2 sm:gap-3 lg:gap-4">
                  <div className="relative">
                    <Search className="absolute left-1.5 xs:left-2 lg:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-2.5 h-2.5 xs:w-3 xs:h-3 lg:w-4 lg:h-4" />
                    <Input
                      placeholder="Cari transaksi..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-6 xs:pl-8 lg:pl-10 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground w-full sm:w-32 md:w-40 lg:w-48 xl:w-64 text-xs xs:text-sm"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-1.5 xs:px-2 sm:px-3 py-1.5 xs:py-2 bg-input border border-border rounded-md text-foreground text-xs xs:text-sm"
                  >
                    <option value="all">Semua Status</option>
                    <option value="completed">Selesai</option>
                    <option value="pending">Pending</option>
                  </select>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-1.5 xs:px-2 sm:px-3 py-1.5 xs:py-2 bg-input border border-border rounded-md text-foreground text-xs xs:text-sm"
                  >
                    <option value={5}>5 per halaman</option>
                    <option value={10}>10 per halaman</option>
                    <option value={20}>20 per halaman</option>
                    <option value={50}>50 per halaman</option>
                  </select>
                  {(searchTerm || statusFilter !== "all") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
                      }}
                      className="text-muted-foreground hover:text-foreground p-0.5 xs:p-1 sm:p-2"
                    >
                      <X className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-2 xs:-mx-3 sm:-mx-4 lg:mx-0">
                <div className="min-w-[600px] xs:min-w-[700px] sm:min-w-[800px] px-2 xs:px-3 sm:px-4 lg:px-0">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-card">
                      <tr className="border-b border-border">
                        <th className="text-left py-1.5 xs:py-2 sm:py-3 lg:py-4 px-0.5 xs:px-1 sm:px-2 lg:px-4 font-medium text-card-foreground">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSort("id")}
                            className="flex items-center gap-0.5 xs:gap-1 sm:gap-2 p-0 h-auto font-medium text-card-foreground hover:text-accent text-xs xs:text-sm"
                          >
                            ID Transaksi
                            {getSortIcon("id")}
                          </Button>
                        </th>
                        <th className="text-left py-1.5 xs:py-2 sm:py-3 lg:py-4 px-0.5 xs:px-1 sm:px-2 lg:px-4 font-medium text-card-foreground">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSort("buyerName")}
                            className="flex items-center gap-0.5 xs:gap-1 sm:gap-2 p-0 h-auto font-medium text-card-foreground hover:text-accent text-xs xs:text-sm"
                          >
                            Pembeli
                            {getSortIcon("buyerName")}
                          </Button>
                        </th>
                        <th className="text-left py-1.5 xs:py-2 sm:py-3 lg:py-4 px-0.5 xs:px-1 sm:px-2 lg:px-4 font-medium text-card-foreground">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSort("amount")}
                            className="flex items-center gap-0.5 xs:gap-1 sm:gap-2 p-0 h-auto font-medium text-card-foreground hover:text-accent text-xs xs:text-sm"
                          >
                            Nominal
                            {getSortIcon("amount")}
                          </Button>
                        </th>
                        <th className="text-left py-1.5 xs:py-2 sm:py-3 lg:py-4 px-0.5 xs:px-1 sm:px-2 lg:px-4 font-medium text-card-foreground">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSort("chapterTitle")}
                            className="flex items-center gap-0.5 xs:gap-1 sm:gap-2 p-0 h-auto font-medium text-card-foreground hover:text-accent text-xs xs:text-sm"
                          >
                            Chapter
                            {getSortIcon("chapterTitle")}
                          </Button>
                        </th>
                        <th className="text-left py-1.5 xs:py-2 sm:py-3 lg:py-4 px-0.5 xs:px-1 sm:px-2 lg:px-4 font-medium text-card-foreground text-xs xs:text-sm">
                          Tanggal
                        </th>
                        <th className="text-left py-1.5 xs:py-2 sm:py-3 lg:py-4 px-0.5 xs:px-1 sm:px-2 lg:px-4 font-medium text-card-foreground text-xs xs:text-sm">
                          Status
                        </th>
                        <th className="text-left py-1.5 xs:py-2 sm:py-3 lg:py-4 px-0.5 xs:px-1 sm:px-2 lg:px-4 font-medium text-card-foreground text-xs xs:text-sm">
                          Detail
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((sale) => (
                        <React.Fragment key={sale.id}>
                          <tr
                            className="border-b border-border hover:bg-accent/10 transition-all duration-200 cursor-pointer group"
                            onClick={() => toggleRowExpansion(sale.id)}
                          >
                            <td className="py-1.5 xs:py-2 sm:py-3 lg:py-4 px-0.5 xs:px-1 sm:px-2 lg:px-4">
                              <span className="font-mono text-xs xs:text-sm text-foreground hover:text-white transition-colors duration-200">
                                {sale.id}
                              </span>
                            </td>
                            <td className="py-1.5 xs:py-2 sm:py-3 lg:py-4 px-0.5 xs:px-1 sm:px-2 lg:px-4">
                              <span className="text-foreground hover:text-white transition-colors duration-200 text-xs xs:text-sm">
                                {sale.buyerName}
                              </span>
                            </td>
                            <td className="py-1.5 xs:py-2 sm:py-3 lg:py-4 px-0.5 xs:px-1 sm:px-2 lg:px-4">
                              <span className="font-semibold text-accent hover:text-white transition-colors duration-200 text-xs xs:text-sm">
                                {formatAmount(sale.amount)}
                              </span>
                            </td>
                            <td className="py-1.5 xs:py-2 sm:py-3 lg:py-4 px-0.5 xs:px-1 sm:px-2 lg:px-4">
                              <span className="text-foreground font-medium hover:text-white transition-colors duration-200 text-xs xs:text-sm">
                                {sale.chapterTitle}
                              </span>
                            </td>
                            <td className="py-1.5 xs:py-2 sm:py-3 lg:py-4 px-0.5 xs:px-1 sm:px-2 lg:px-4">
                              <span className="text-muted-foreground hover:text-white transition-colors duration-200 text-xs xs:text-sm">
                                {sale.purchaseDate}
                              </span>
                            </td>
                            <td className="py-1.5 xs:py-2 sm:py-3 lg:py-4 px-0.5 xs:px-1 sm:px-2 lg:px-4">
                              {getStatusBadge(sale.status)}
                            </td>
                            <td className="py-1.5 xs:py-2 sm:py-3 lg:py-4 px-0.5 xs:px-1 sm:px-2 lg:px-4">
                              <ChevronRight
                                className={`w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 text-muted-foreground transition-transform duration-200 ${
                                  expandedRows.has(sale.id) ? "rotate-90" : ""
                                }`}
                              />
                            </td>
                          </tr>
                          {expandedRows.has(sale.id) && (
                            <tr className="bg-accent/5 border-b border-border">
                              <td
                                colSpan={7}
                                className="py-1.5 xs:py-2 sm:py-3 lg:py-4 px-0.5 xs:px-1 sm:px-2 lg:px-4"
                              >
                                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-1.5 xs:gap-2 sm:gap-3 lg:gap-4 text-xs xs:text-sm">
                                  <div>
                                    <span className="text-muted-foreground">
                                      Metode Pembayaran:
                                    </span>
                                    <p className="text-foreground font-medium">
                                      {sale.details.paymentMethod}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">
                                      Waktu Transaksi:
                                    </span>
                                    <p className="text-foreground font-medium">
                                      {sale.details.transactionTime}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">
                                      Perangkat:
                                    </span>
                                    <p className="text-foreground font-medium">
                                      {sale.details.deviceType}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">
                                      Lokasi:
                                    </span>
                                    <p className="text-foreground font-medium">
                                      {sale.details.location}
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 xs:gap-3 sm:gap-4 mt-2 xs:mt-3 sm:mt-4 lg:mt-6 pt-2 xs:pt-3 sm:pt-4 border-t border-border">
                <p className="text-xs xs:text-sm text-muted-foreground text-center sm:text-left">
                  Menampilkan {startIndex + 1}-
                  {Math.min(
                    startIndex + itemsPerPage,
                    filteredAndSortedData.length
                  )}{" "}
                  dari {filteredAndSortedData.length} transaksi (Total:{" "}
                  {salesData.length})
                </p>
                <div className="flex items-center gap-1 xs:gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground bg-transparent text-xs xs:text-sm px-1.5 xs:px-2 sm:px-3"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    Previous
                  </Button>
                  <span className="text-xs xs:text-sm text-muted-foreground px-1 xs:px-2">
                    {currentPage} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground bg-transparent text-xs xs:text-sm px-1.5 xs:px-2 sm:px-3"
                    disabled={currentPage >= totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export { BookSalesDashboard };
export default BookSalesDashboard;
